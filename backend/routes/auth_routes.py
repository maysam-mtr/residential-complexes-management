# •	Login endpoint (POST /login) using email & password
# •	Return a token (JWT preferred)
# •	Restrict access based on admin role

from flask import Blueprint, request
from validations.auth_validation import auth_schema
from services.admin_service import AdminService
from utils.response_helper import make_response

auth_route = Blueprint("AuthRoute", __name__)

@auth_route.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    errors = auth_schema.validate(data)
    if errors:
        return make_response(False, "Failed to authenticate admin", 400, None, errors)
    
    try:
        response = AdminService.authenticate_admin(data['email'], data['password'])
        resp = make_response(True, "Authenticated!", 200, response)

        return resp
    except ValueError as err:
        return make_response(False, "Invalid email or password", 401, None, str(err))
    except Exception as err:
        return make_response(False, "Failed to authenticate admin", 500, None, str(err))