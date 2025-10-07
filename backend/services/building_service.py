from extensions import db
from models.building import Building
from models.admin import Admin
from models.res_complex import ResidentialComplex

class BuildingService:
    @staticmethod
    def get_all_buildings():
        buildings = Building.query.all()
        return [
            {
                "id": b.id,
                "name": b.name,
                "admin_id": b.admin_id,
                "complex_id": b.complex_id,
            }
            for b in buildings
        ]
    
    @staticmethod
    def add_building(data):
        admin_exists = Admin.query.filter_by(id=data['admin_id']).first()
        if not admin_exists:
            raise ValueError("Invalid Admin Id")
        
        complex_exists = ResidentialComplex.query.filter_by(id=data['complex_id']).first()
        if not complex_exists:
            raise ValueError("Invalid Complex Id")

        new_building = Building(
            name = data["name"],
            admin_id = data['admin_id'],
            complex_id = data['complex_id'],
        )
        
        try:
            db.session.add(new_building)
            db.session.commit()
        except Exception as err:
            db.session.rollback()
            raise err

        return {
            "id": new_building.id,
            "name": new_building.name,
            "admin_id": new_building.admin_id,
            "complex_id": new_building.complex_id
        }
    
    @staticmethod
    def delete_building(building_id):
        building = Building.query.filter_by(id=building_id).first()
        if not building:
            raise ValueError("Invalid Building Id")
        
        try:
            db.session.delete(building)
            db.session.commit()
        except Exception as err:
            db.session.rollback()
            raise err

        return True
