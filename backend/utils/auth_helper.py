from functools import wraps
from utils.response_helper import make_response
from flask_jwt_extended import get_jwt, jwt_required

def role_required(allowed_roles):
    def decorator(f):
        @wraps(f)
        @jwt_required()
        def decorated(*args, **kwargs):
            try: 

                token = get_jwt()
                if token.get("role") not in allowed_roles:
                    return make_response(False, "Forbidden: Access denied", 403)
            except Exception as err:
                return make_response(False, "Unauthorized", 401, None, str(err))
            return f(*args, **kwargs)
        return decorated
    return decorator