from flask import Blueprint, request
from services.complex_service import ComplexService
from utils.response_helper import make_response
from validations.complex_validation import complex_schema
from flask_jwt_extended import jwt_required
from utils.auth_helper import role_required

complex_route = Blueprint("ComplexRoute", __name__)

@complex_route.route("/complexes", methods=['GET'])
@jwt_required()
def getComplexes():
    try:
        complexes = ComplexService.get_all_complexes()
        return make_response(True, "Residential complexes retrieved successfully", 200, {"complexes": complexes})
    except Exception as err:
        error_message = getattr(err, "messages", str(err))
        return make_response(False, "Failed to get complexes", 400, None, error_message)

@complex_route.route('/complexes', methods=['POST'])
@jwt_required()
@role_required(["SUPER_ADMIN"])
def addComplex():
    data = request.get_json()
    errors = complex_schema.validate(data)
    if errors:
        return make_response(False, "Failed to add complex", 400, None, errors)
    try: 
        complex = ComplexService.add_complex(data)
        return make_response(True, "Complex added successfully", 201, {"complex": complex})
    except ValueError as err:
        return make_response(False, "Failed to add complex", 400, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))
    
@complex_route.route('/complexes/<int:id>/buildings', methods=['GET'])
@jwt_required()
def getComplexBuildings(id):
    try: 
        buildings = ComplexService.get_complex_buildings(id)
        return make_response(True, "Complex buildings retrieved successfully", 201, {"buildings": buildings})
    except ValueError as err:
        return make_response(False, "Failed to get complex buildings", 404, None, str(err))
    except Exception as err:
        return make_response(False, "Internal server error", 500, None, str(err))
    
