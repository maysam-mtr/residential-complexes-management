from flask import Blueprint, request
from utils.response_helper import make_response
from validations.building_validation import building_schema
from services.building_service import BuildingService
from flask_jwt_extended import jwt_required
from utils.auth_helper import role_required

building_route = Blueprint("BuildingRoute", __name__)

@building_route.route("/buildings", methods=['GET'])
@jwt_required()
def getBuildings():
    try:
        buildings = BuildingService.get_all_buildings()
        return make_response(True, "Buildings retrieved successfully", 200, {"buildings": buildings})
    except Exception as err:
        error_message = getattr(err, "messages", str(err))
        return make_response(False, "Failed to get buildings", 400, None, error_message)

@building_route.route("/buildings", methods=["POST"])
@jwt_required()
@role_required(["SUPER_ADMIN", "COMPLEX_ADMIN"])
def addBuilding():
    data = request.get_json()
    errors = building_schema.validate(data)
    if errors:
        return make_response(False, "Failed to add building", 400, None, errors)
    try: 
        building = BuildingService.add_building(data)
        return make_response(True, "Building added successfully", 201, {"building": building})
    except ValueError as err:
        return make_response(False, "Failed to add building", 400, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))

@building_route.route("/buildings/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required(["SUPER_ADMIN", "COMPLEX_ADMIN"])
def deleteBuilding(id):
    try: 
        building = BuildingService.delete_building(id)
        return make_response(True, "Building deleted successfully", 200)
    except ValueError as err:
        return make_response(False, "Failed to delete building", 400, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))
