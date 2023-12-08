import datetime
from backend.app.extensions import db
from backend.app.models import Article
from backend.app.static.article_content import article_contents

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
except Exception as e:
    db.session.rollback()
