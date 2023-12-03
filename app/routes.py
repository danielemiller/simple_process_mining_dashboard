import os
from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models import EventLog, User


def register_routes(app):

    # Set the directory where uploaded files will be stored
    UPLOAD_FOLDER = './uploads'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    # Ensure the upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    @app.route("/upload", methods=['POST'])
    def upload():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        filename = secure_filename(file.filename)
        if filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        event_log = EventLog(filename=filename, user_id=current_user.id)
        db.session.add(event_log)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 201

    @app.route("/register", methods=['POST'])
    def register():
        data = request.get_json()
        hashed_password = generate_password_hash(data['password'])
        user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201

    @app.route("/login", methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        return jsonify({'error': 'Invalid username or password'}), 401

    @app.route("/logout", methods=['POST'])
    @jwt_required()
    def logout():
        user_id = get_jwt_identity()
        # The actual 'logout' is just the client discarding the token.
        # Optionally, implement token revocation here if you have a more advanced setup.
        return jsonify({'message': f'User {user_id} logged out successfully'}), 200
