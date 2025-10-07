from marshmallow import Schema, fields

class AuthSchema(Schema):
    email = fields.Email(
        required=True, 
        error_messages = {"required": "Admin Email is Required"}
    )

    password = fields.String(
        required=True,
        error_messages={"required": "Password is Required"}
    )

auth_schema = AuthSchema()