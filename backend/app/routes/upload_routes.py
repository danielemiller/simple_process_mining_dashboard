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

        # Extract additional form data (column names)
        activity_column = request.form.get('activityColumn')
        timestamp_column = request.form.get('timestampColumn')
        case_key_column = request.form.get('caseKeyColumn')

        # You might want to validate the column names here

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Store the file along with the column names in the database
        event_log = EventLog(filename=filename, user_id=user_id, activity_column=activity_column, timestamp_column=timestamp_column, case_key_column=case_key_column)
        db.session.add(event_log)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201