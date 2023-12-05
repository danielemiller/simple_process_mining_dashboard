import logging
from flask import Response, request, jsonify
from backend.app.services.process_mining_service import ProcessMiningService
from backend.app.extensions import db
from backend.app.models import EventLog

def register_process_mining_routes(app):

    @app.route('/process_mining/discovery', methods=['POST'])
    def process_discovery():
        file = request.files['file']
        representation_type = request.args.get('type', 'text')
        
        if not file:
            return jsonify({'error': 'No file provided'}), 400
        
        try:
            results = ProcessMiningService.process_discovery(file, representation_type)
            if representation_type == 'text':
                return jsonify({'text_representation': results})
            elif representation_type == 'graph':
                # Assuming graph representation returns JSON data
                return jsonify({'graph_representation': results})
            elif representation_type == 'bpmn':
                # Returning BPMN XML as plain text; frontend should handle rendering
                return Response(results, mimetype='application/xml')
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    @app.route('/calculate_cycle_times', methods=['POST'])
    def calculate_cycle_times():
        # Assuming the event log is sent in the request
        event_log = request.json['event_log']
        cycle_times = ProcessMiningService.calculate_cycle_times(event_log)
        return jsonify(cycle_times)

    @app.route('/identify_bottlenecks', methods=['POST'])
    def identify_bottlenecks():
        event_log = request.json['event_log']
        bottlenecks = ProcessMiningService.identify_bottlenecks(event_log)
        return jsonify(bottlenecks)

    @app.route('/process_mining/event_logs', methods=['GET'])
    def get_event_logs():
        try:
            # Query the database for all event logs
            event_logs = EventLog.query.with_entities(EventLog.id, EventLog.filename).all()
            
            # Transform the result into a list of dictionaries
            event_logs_list = [{'id': log.id, 'filename': log.filename} for log in event_logs]

            return jsonify(event_logs_list)
        except Exception as e:
            # Handle exceptions
            logging.error(f"Error fetching event logs: {e}")
            return jsonify({'error': str(e)}), 500

    
