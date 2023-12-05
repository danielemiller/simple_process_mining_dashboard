from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
from backend.app.models import EventLog
from backend.app.extensions import db

def register_upload_routes(app):
    # Set the directory where uploaded files will be stored
    UPLOAD_FOLDER = './uploads'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    # Ensure the upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    @app.route("/upload", methods=['POST'])
    @jwt_required()
    def upload():
        user_id = get_jwt_identity()
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        filename = secure_filename(file.filename)
        if filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        event_log = EventLog(filename=filename, user_id=user_id)
        db.session.add(event_log)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201