from datetime import timedelta
from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from backend.app.models import User
from backend.app.extensions import db

def register_auth_routes(app):
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
            access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=15))
            return jsonify(access_token=access_token), 200
        return jsonify({'error': 'Invalid username or password'}), 401
    
    @app.route("/logout", methods=['POST'])
    def logout():
        # The actual 'logout' is just the client discarding the token.
        # Optionally, implement token revocation here if you have a more advanced setup.
        return jsonify({'message': 'User logged out successfully'}), 200