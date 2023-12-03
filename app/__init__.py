from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
hex_key = os.environ.get('SECRET_KEY')
app.config['SECRET_KEY'] = bytes.fromhex(hex_key)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///process-engine.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app import models, routes
