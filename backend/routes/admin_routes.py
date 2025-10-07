# •	GET /admins (searchable, paginated)
# •	POST /admins to add admins (only Super Admin)
# •	validate Email is unique (done)

from flask import Blueprint, request
from validations.admin_validation import admin_schema
from services.admin_service import AdminService
from utils.response_helper import make_response
from utils.auth_helper import role_required
from flask_jwt_extended import jwt_required

admin_route = Blueprint("AdminRoute", __name__)

@admin_route.route("/admins", methods=['GET'])
@jwt_required()
def get_admins():
    try:
        search = request.args.get("search", default=None, type=str)
        page = request.args.get("page", default=1, type=int)
        limit = request.args.get("limit", default=10, type=int)

        admins = AdminService.get_all_admins(search, page, limit)
        return make_response(True, "Admins retrieved successfully", 200, admins)
    except Exception as err:
        error_message = getattr(err, "messages", str(err))
        return make_response(False, "Failed to get admins", 400, None, error_message)

@admin_route.route('/admins', methods=['POST'])
@jwt_required()
@role_required(["SUPER_ADMIN"])
def add_admin():
    data = request.get_json()
    errors = admin_schema.validate(data)
    if errors:
        return make_response(False, "Failed to create admin", 400, None, errors)
    try: 
        admin = AdminService.create_admin(data)
        return make_response(True, "Admin added successfully", 201, {"admin": admin})
    except ValueError as err:
        return make_response(False, "Failed to create admin", 400, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))
    
@admin_route.route('/admins/<int:id>/complexes', methods=['GET'])
@jwt_required()
def get_admin_complexes(id):
    try: 
        complexes = AdminService.get_admin_complexes(id)
        return make_response(True, "Admin Complexes retrieved successfully", 200, {"complexes": complexes})
    except ValueError as err:
        return make_response(False, "Failed to get admin complexes", 404, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))
    
@admin_route.route('/admins/<int:id>/buildings', methods=['GET'])
@jwt_required()
def get_admin_buildings(id):
    try: 
        buildings = AdminService.get_admin_buildings(id)
        return make_response(True, "Admin Buildings retrieved successfully", 200, {"buildings": buildings})
    except ValueError as err:
        return make_response(False, "Failed to get admin buildings", 404, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))