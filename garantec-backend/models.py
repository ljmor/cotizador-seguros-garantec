# models.py

from database import db # 👈 MODIFICADO: Ahora importamos db desde el nuevo archivo 'database.py'
from datetime import datetime
# El resto del archivo se queda exactamente igual
class Cotizacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # Datos del cliente
    nombres = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    fechaNacimiento = db.Column(db.String(20))
    sexo = db.Column(db.String(20))
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(120), unique=True, nullable=False)
    provincia = db.Column(db.String(50))
    canton = db.Column(db.String(50))
    
    # Datos del seguro
    tipoSeguroPrincipal = db.Column(db.String(50))
    tipoSeguroSalud = db.Column(db.String(50), nullable=True) # Puede ser nulo
    aceptaTerminos = db.Column(db.Boolean, default=False)

    fecha_creacion = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    fecha_actualizacion = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    
    def __repr__(self):
        return f'<Cotizacion de {self.nombres} {self.apellidos}>'