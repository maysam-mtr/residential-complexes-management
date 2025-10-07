from extensions import db
from sqlalchemy.orm import relationship
from models.admin import Admin

class ResidentialComplex(db.Model):
    __tablename__="complexes"

    id = db.Column(db.Integer, primary_key=True)
    identity = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    campaign_info = db.Column(db.String(200), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), nullable=False)

    admin = relationship("Admin", backref="residential_complexes")

   