from marshmallow import Schema, fields, validate
from utils.status_enum import StatusEnum
from utils.role_enum import RoleEnum

class AdminSchema(Schema):
    email = fields.Email(required=True, error_messages = {
        "required": "Admin Email is Required"
    })

    civility = fields.String(required=True, validate=validate.OneOf(["Mr", "Ms", "Mrs", "Dr"]), error_messages={
        "required": "Admin Civility is Required"
    })

    first_name = fields.String(required=True, error_messages = {
        "required": "Admin First Name is Required"
    })

    last_name = fields.String(required=True, error_messages = {
        "required": "Admin Last Name is Required"
    })

    phone = fields.String(required=True, validate=validate.Regexp(
            r'^\+?[\d\s\-]{7,15}$',
            error="Phone number must be digits, optionally start with +, and 7-15 digits long"
        ), error_messages = {"required": "Admin Phone Number is Required"}
    )

    role = fields.Integer(required=True, validate=validate.OneOf([r.value for r in RoleEnum]), error_messages = {
        "required": "Admin Role is Required"
    })

    status = fields.Integer(required=False, validate=validate.OneOf([s.value for s in StatusEnum]))

    password = fields.String(
        required=True,
        validate=validate.Regexp(
            r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$',
            error="Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        ),
        error_messages={"required": "Password is Required"}
    )

admin_schema = AdminSchema()
