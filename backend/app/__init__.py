# __init__.py

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.extensions import db, migrate
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)
    CORS(app)
    load_dotenv()

    app.config['SECRET_KEY'] = bytes.fromhex(os.environ.get('SECRET_KEY'))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///process-engine.db'

    db.init_app(app)
    migrate.init_app(app, db)

    app.config['JWT_SECRET_KEY'] = bytes.fromhex(os.environ.get('JWT_SECRET_KEY'))
    jwt = JWTManager(app)

    # Import models and routes here
    from app import models
    from app.routes import register_routes

    register_routes(app)

    return app
