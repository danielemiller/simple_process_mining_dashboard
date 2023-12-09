from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request, send_file
import os
from backend.app.services.event_log_generator_service import EventLogGeneratorService
import logging

def register_generator_routes(app):
    @app.route('/generate_event_log/<process_type>', methods=['GET'])
    @jwt_required()
    def generate_event_log_route(process_type):
        try:
            base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            file_path = EventLogGeneratorService.generate_event_log(process_type, base_path=base_path)

            if not os.path.isfile(file_path):
                logging.error(f"File not found: {file_path}")
                return jsonify({'error': 'File not found'}), 404

            return send_file(file_path, as_attachment=True, download_name=os.path.basename(file_path))

        except ValueError as e:
            logging.error(f"Error generating event log: {e}")
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            logging.error(f"Unhandled exception: {e}")
            return jsonify({'error': str(e)}), 500
