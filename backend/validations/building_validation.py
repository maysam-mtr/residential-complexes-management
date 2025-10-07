from marshmallow import Schema, fields

class BuildingSchema(Schema):
    name = fields.String(required=True, error_messages={
        "required": "Building name is required"
    })
    
    admin_id = fields.Integer(required=True, error_messages = {
        "required": "Admin Id is required"
    })

    complex_id = fields.Integer(required=True, error_messages = {
        "required": "Residential Complex Id is required"
    })

building_schema = BuildingSchema()