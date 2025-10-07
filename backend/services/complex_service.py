from extensions import db
from models.admin import Admin
from models.res_complex import ResidentialComplex

class ComplexService:
    @staticmethod
    def get_all_complexes():
        complexes = ResidentialComplex.query.all()
        return [
            {
                "id": c.id,
                "identity": c.identity,
                "address": c.address,
                "campaign_info": c.campaign_info,
                "admin_id": c.admin_id
            }
            for c in complexes
        ]
    
    @staticmethod
    def get_complex_buildings(complex_id):
        complex = ResidentialComplex.query.get(complex_id)
        if not complex:
            raise ValueError("Complex not found")
        
        return [
            {
                "id": b.id,
                "name": b.name,
                "admin_id": b.admin_id
            }
            for b in complex.buildings
        ]
    
    @staticmethod
    def add_complex(data):
        admin_exists = Admin.query.filter_by(id=data['admin_id']).first()
        if not admin_exists:
            raise ValueError("Invalid Admin Id")
        
        new_complex = ResidentialComplex(
            identity = data['identity'],
            address = data['address'],
            campaign_info = data['campaign_info'],
            admin_id = data['admin_id'],
        )
        
        try:
            db.session.add(new_complex)
            db.session.commit()
        except Exception as err:
            db.session.rollback()
            raise err

        return {
            "id": new_complex.id,
            "identity": new_complex.identity,
            "address": new_complex.address,
            "campaign_info": new_complex.campaign_info,
            "admin_id": new_complex.admin_id
        }
