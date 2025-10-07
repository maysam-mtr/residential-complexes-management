from extensions import db
from utils.status_enum import StatusEnum
from utils.role_enum import RoleEnum
from sqlalchemy import Enum

class Admin(db.Model):
    __tablename__="admins"

    id = db.Column(db.Integer, primary_key=True)
    civility = db.Column(db.String(10), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    status = db.Column(Enum(StatusEnum), default=StatusEnum.ACTIVE)
    role = db.Column(Enum(RoleEnum), nullable=False)
    password = db.Column(db.String(200), nullable=False)

