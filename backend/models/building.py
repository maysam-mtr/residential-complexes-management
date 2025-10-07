from extensions import db
from sqlalchemy.orm import relationship
from models.admin import Admin
from models.res_complex import ResidentialComplex

class Building(db.Model):
    __tablename__="buildings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), nullable=False)
    complex_id = db.Column(db.Integer, db.ForeignKey("complexes.id"), nullable=False)

    complex = relationship("ResidentialComplex", backref="buildings")
    admin = relationship("Admin", backref="buildings")

   