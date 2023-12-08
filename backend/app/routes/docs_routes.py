from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from backend.app.models import Article
from backend.app.extensions import db
from backend.app.static.article_content import article_contents

def register_docs_routes(app):

    @app.route('/docs/articles', methods=['GET'])
    def get_articles():
        articles = Article.query.all()
        return jsonify([article.to_dict() for article in articles])
    
    @app.route('/docs/initialcommit', methods=['GET'])
    def commit_first_articles():
        print('starting function')    
        # Iterate over the article_contents dictionary and insert each article into the database
        for article_id, article_data in article_contents.items():
            new_article = Article(
                title=article_data['title'],
                description=article_data['description'],
                keywords=article_data['keywords'],
                content=article_data['content'],
                created_at=datetime.utcnow(),
                updated=datetime.utcnow()
            )
            db.session.add(new_article)

        # Commit the session to save changes
        try:
            db.session.commit()
            print('successfully committed')
            return jsonify({'message': 'Articles successfully added'}), 200  # Return a success message
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Failed to add articles'}), 500  # Return an error message
        
    @app.route('/docs/articles/<article_id>', methods=['GET'])
    def get_article(article_id):
        article = Article.query.get(article_id)
        if article:
            return jsonify(article.to_dict())
        else:
            return jsonify({'error': 'Article not found'}), 404