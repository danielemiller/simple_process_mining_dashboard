from flask_login import UserMixin
from backend.app.extensions import db
from datetime import datetime

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    logs = db.relationship('EventLog', backref='author', lazy=True)

    # Flask-Login integration
    def get_id(self):
           return (self.id)

class EventLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_column = db.Column(db.String(100))  
    timestamp_column = db.Column(db.String(100))  
    case_key_column = db.Column(db.String(100))

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))  # New field
    keywords = db.Column(db.String(255))  # New field, could be a comma-separated string
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'keywords': self.keywords.split(',') if self.keywords else [],
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'updated': self.updated.isoformat()
        }