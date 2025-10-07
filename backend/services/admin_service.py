from extensions import db
from models.admin import Admin
from utils.role_enum import RoleEnum
from utils.status_enum import StatusEnum
from flask_bcrypt import Bcrypt
import datetime
from flask_jwt_extended import create_access_token
from sqlalchemy import or_

bcrypt = Bcrypt()

class AdminService:
    @staticmethod
    def get_all_admins(search, page, limit):
        admins = Admin.query

        if search:
            admins = admins.filter(or_(Admin.first_name.ilike(f"%{search}%"), 
                                       Admin.last_name.ilike(f"%{search}%"), 
                                       Admin.email == search,
                                       Admin.phone == search))

        total = admins.count()
        admins_list = admins.offset((page-1)*limit).limit(limit).all()

        return ({
                "total": total,
                "page": page,
                "limit": limit,
                "admins": [{
                        "id": a.id,
                        "civility": a.civility,
                        "firstName": a.first_name,
                        "lastName": a.last_name,
                        "email": a.email,
                        "phone": a.phone,
                        "status": a.status.name,
                        "role": a.role.name
                    } 
                    for a in admins_list
                ]
            })
        
    
    @staticmethod
    def get_admin_complexes(admin_id):
        admin = Admin.query.get(admin_id)

        if not admin:
            raise ValueError("Admin not found")
        
        return [
            {
                "id": c.id,
                "identity": c.identity,
                "address": c.address,
                "campaign_info": c.campaign_info
            }
            for c in admin.residential_complexes
        ]

    @staticmethod
    def get_admin_buildings(admin_id):
        admin = Admin.query.get(admin_id)

        if not admin:
            raise ValueError("Admin not found")
        print(admin.buildings)
        return [
            {
                "id": b.id,
                "name": b.name,
                "complex_id": b.complex_id
            }
            for b in admin.buildings
        ]
    
    @staticmethod
    def create_admin(data):
        email_exists = Admin.query.filter_by(email=data['email']).first()
        if email_exists:
            raise ValueError("Email already exists")
        
        role_enum = RoleEnum(data['role'])
        status_enum = StatusEnum(data['status']) if 'status' in data else StatusEnum.ACTIVE
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_admin = Admin(
            civility = data['civility'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            phone = data['phone'],
            status = status_enum.name,
            role = role_enum.name,
            password = hashed_password
        )
        
        try:
            db.session.add(new_admin)
            db.session.commit()
        except Exception as err:
            db.session.rollback()
            raise err

        return {
            "id": new_admin.id,
            "email": new_admin.email,
            "firstName": new_admin.first_name,
            "lastName": new_admin.last_name,
            "phone": new_admin.phone,
            "role": new_admin.role.name,
            "status": new_admin.status.name
        }
    
    @staticmethod
    def authenticate_admin(admin_email, admin_password):
        admin = Admin.query.filter_by(email=admin_email).first()
        if not admin:
            raise ValueError("Invalid email or password")
        
        if not bcrypt.check_password_hash(admin.password, admin_password):
            raise ValueError("Invalid email or password")
        
        token = create_access_token(
                identity=str(admin.id),
                additional_claims={
                    "role": admin.role.name
                },
                expires_delta=datetime.timedelta(hours=3)
            )
        return {
            "token": token,
            "admin": {
                "id": admin.id,
                "email": admin.email,
                "firstName": admin.first_name,
                "lastName": admin.last_name,
                "phone": admin.phone,
                "role": admin.role.name,
                "status": admin.status.name
            }
        }