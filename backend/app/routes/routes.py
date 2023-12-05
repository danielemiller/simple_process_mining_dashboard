from backend.app.routes.auth_routes import register_auth_routes
from backend.app.routes.upload_routes import register_upload_routes
from backend.app.routes.process_mining_routes import register_process_mining_routes


def register_routes(app):
    register_auth_routes(app)
    register_upload_routes(app)
    register_process_mining_routes(app)
