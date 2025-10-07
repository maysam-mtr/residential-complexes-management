from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from flask_jwt_extended import JWTManager

from models.admin import Admin
from models.res_complex import ResidentialComplex
from models.building import Building

from routes.auth_routes import auth_route
from routes.admin_routes import admin_route
from routes.buildings_routes import building_route
from routes.complexes_routes import complex_route

from utils.response_helper import make_response

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, allow_headers="*", supports_credentials=True)

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return make_response(False, "Unauthorized: Log in required", 401)
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return make_response(False, "Unauthorized: Invalid token", 401)
    
    @jwt.expired_token_loader
    def expired_token_callback(error):
        return make_response(False, "Unauthorized: Token expired, log in again", 401)
    
    #routes
    app.register_blueprint(auth_route, url_prefix="/api")
    app.register_blueprint(admin_route, url_prefix="/api")
    app.register_blueprint(building_route, url_prefix="/api")
    app.register_blueprint(complex_route, url_prefix="/api")

    return app

if __name__ == "__main__":
    app = create_app()

    with app.app_context():
        db.create_all()

    app.run(debug=True)
