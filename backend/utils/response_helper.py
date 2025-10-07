from flask import jsonify

def make_response(success: bool, message: str = "", code: int = 500, data = None, error = None):
    return jsonify({
        "success": success,
        "message": message,
        "code": code,
        "data": data,
        "error": error
    }), code