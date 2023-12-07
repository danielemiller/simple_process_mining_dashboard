from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.app.services.process_mining_service import ProcessMiningService
from backend.app.models import EventLog
import logging

def register_process_mining_routes(app):

    @app.route('/process_mining/discovery', methods=['POST'])
    def process_discovery():
        event_log_id = request.json.get('event_log_id')
        representation_type = request.json.get('type', 'text')
    
        try:
            results = ProcessMiningService.process_discovery(event_log_id, representation_type, app.config['UPLOAD_FOLDER'])
        
            if representation_type == 'text':
                return jsonify({'text_representation': results})
            elif representation_type == 'graph':
                # Assuming graph representation returns JSON data
                return jsonify({'graph_representation': results})
            elif representation_type == 'bpmn':
                # Returning BPMN XML as plain text; frontend should handle rendering
                # return Response(results, mimetype='application/xml')
                return jsonify({'bpmn': results})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    @app.route('/calculate_cycle_times', methods=['POST'])
    def calculate_cycle_times():
        # Assuming the event log is sent in the request
        event_log_id = request.json['event_log_id']
        cycle_times = ProcessMiningService.calculate_cycle_times(event_log_id, app.config['UPLOAD_FOLDER'])
        return jsonify(cycle_times)

    @app.route('/identify_bottlenecks', methods=['POST'])
    def identify_bottlenecks():
        event_log_id = request.json['event_log_id']
        bottlenecks = ProcessMiningService.analyze_bottlenecks(event_log_id, app.config['UPLOAD_FOLDER'])
        return jsonify(bottlenecks)

    
    @app.route('/process_mining/event_logs', methods=['GET'])
    @jwt_required()
    def get_event_logs():
        try:
            # Get the current user's identity from the JWT
            current_user_id = get_jwt_identity()
            
            # Query the database for event logs associated with the current user
            event_logs = EventLog.query.filter_by(user_id=current_user_id).with_entities(EventLog.id, EventLog.filename).all()
            
            # Transform the result into a list of dictionaries
            event_logs_list = [{'id': log.id, 'filename': log.filename} for log in event_logs]

            return jsonify(event_logs_list)
        except Exception as e:
            # Handle exceptions
            logging.error(f"Error fetching event logs: {e}")
            return jsonify({'error': str(e)}), 500

    
