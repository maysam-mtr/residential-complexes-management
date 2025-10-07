from marshmallow import Schema, fields, validate

class ComplexSchema(Schema):
    identity = fields.String(required=True, error_messages = {
        "required": "Complex Identity is required"
    })

    address = fields.String(required=True, validate=validate.Length(min=3, max=200), error_messages = {
        "required": "Complex Address is required"
    })

    campaign_info = fields.String(required=True, validate=validate.Length(min=3, max=200), error_messages = {
        "required": "Complex Campaign Info is required"
    })

    admin_id = fields.Integer(required=True, error_messages = {
        "required": "Admin Id is required"
    })

complex_schema = ComplexSchema()