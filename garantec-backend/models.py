# models.py

from database import db
from datetime import datetime

class Cotizacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # --- Campos Personales ---
    nombres = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    fechaNacimiento = db.Column(db.String(20), nullable=True)
    sexo = db.Column(db.String(20), nullable=True)
    telefono = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    cedula = db.Column(db.String(10), nullable=True)
    
    # --- Campos de Dirección ---
    provincia = db.Column(db.String(50), nullable=True)
    canton = db.Column(db.String(50), nullable=True)
    parroquia = db.Column(db.String(100), nullable=True)
    callePrincipal = db.Column(db.String(150), nullable=True)
    calleSecundaria = db.Column(db.String(150), nullable=True)
    numeroCasa = db.Column(db.String(20), nullable=True)
    referencias = db.Column(db.String(255), nullable=True)
    
    # --- Campos de Tipo de Seguro ---
    tipoSeguroPrincipal = db.Column(db.String(50), nullable=True)
    tipoSeguroSalud = db.Column(db.String(50), nullable=True)
    tipoSeguroVida = db.Column(db.String(50), nullable=True)
    tipoSeguroAuto = db.Column(db.String(50), nullable=True)
    
    # --- Campos Específicos ---
    ocupacion = db.Column(db.String(100), nullable=True)
    marcaVehiculo = db.Column(db.String(50), nullable=True)
    modeloVehiculo = db.Column(db.String(50), nullable=True)
    anioVehiculo = db.Column(db.Integer, nullable=True)
    placaVehiculo = db.Column(db.String(10), nullable=True)
    
    # --- AÑADIDO: Campos para el plan seleccionado ---
    plan_seleccionado_id = db.Column(db.Integer, db.ForeignKey('plan.id', name='fk_cotizacion_plan'), nullable=True)
    precio_final = db.Column(db.Float, nullable=True)

    # --- Campos de Control ---
    aceptaTerminos = db.Column(db.Boolean, default=False)
    fecha_creacion = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    fecha_actualizacion = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Cotizacion de {self.nombres} {self.apellidos}>'

# --- AÑADIDO: Nuevo modelo para la tabla de Planes ---
class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    aseguradora = db.Column(db.String(100))
    precio = db.Column(db.Float, nullable=False)
    tipo_seguro = db.Column(db.String(50), nullable=False) # 'Salud', 'Vida', o 'Auto'
    detalles = db.Column(db.Text, nullable=True) # Detalles separados por ';'

    def __repr__(self):
        return f'<Plan {self.id}: {self.nombre}>'
