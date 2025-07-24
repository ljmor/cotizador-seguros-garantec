# app.py

# --- Importaciones Necesarias ---
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime # Se importa datetime para la lógica de fechas
from flask_migrate import Migrate # 👈 1. Importa Migrate

# --- Importaciones de nuestra aplicación ---
from database import db
from models import Cotizacion

# --- Configuración Inicial de la Aplicación ---
app = Flask(__name__)
CORS(app)

# --- Configuración de la Base de Datos ---
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'garantec.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Conecta nuestra instancia de la base de datos con la aplicación
db.init_app(app)

migrate = Migrate(app, db)
# --- Definición de Rutas (Endpoints) ---

@app.route('/')
def hola_mundo():
  """
  Ruta de bienvenida para verificar que el servidor está funcionando.
  """
  return '¡Bienvenido a la API de Garantec con Flask! 🐍'


@app.route('/api/cotizaciones', methods=['POST'])
def crear_cotizacion():
  """
  Ruta para recibir y guardar una nueva cotización en la base de datos.
  """
  datos = request.get_json()
  try:
    nueva_cotizacion = Cotizacion(
        nombres=datos.get('nombres'),
        apellidos=datos.get('apellidos'),
        fechaNacimiento=datos.get('fechaNacimiento'),
        sexo=datos.get('sexo'),
        telefono=datos.get('telefono'),
        email=datos.get('email'),
        provincia=datos.get('provincia'),
        canton=datos.get('canton'),
        tipoSeguroPrincipal=datos.get('tipoSeguroPrincipal'),
        tipoSeguroSalud=datos.get('tipoSeguroSalud'),
        aceptaTerminos=datos.get('aceptaTerminos')
    )
    db.session.add(nueva_cotizacion)
    db.session.commit()
    print(f"ÉXITO: Cotización guardada con ID: {nueva_cotizacion.id}")
    return jsonify({
        'mensaje': '¡Cotización guardada en la base de datos!', 
        'id_cotizacion': nueva_cotizacion.id
    }), 201
  except Exception as e:
    db.session.rollback()
    print(f"ERROR: No se pudo guardar en la base de datos. {e}")
    return jsonify({'mensaje': 'Error al guardar en la base de datos', 'error': str(e)}), 500


@app.route('/api/cotizaciones', methods=['GET'])
def obtener_cotizaciones():
    """
    Ruta para obtener todas las cotizaciones con estado y progreso dinámicos.
    """
    try:
        todas_las_cotizaciones = Cotizacion.query.order_by(Cotizacion.fecha_creacion.desc()).all()
        
        cotizaciones_lista = []
        for cotizacion in todas_las_cotizaciones:
            # --- Lógica para calcular progreso y estado dinámicamente ---
            progreso = 25
            detalles = "Faltan datos personales."
            
            # Revisa si los campos clave están llenos para ajustar el progreso.
            # Esta lógica la puedes hacer tan compleja como necesites.
            if cotizacion.nombres and cotizacion.email and cotizacion.telefono:
                progreso = 75 # O el valor que corresponda a ese paso
                detalles = "Pendiente de confirmación."
            
            # --- Fin de la lógica ---

            # Se crea el diccionario para cada cotización
            cotizaciones_lista.append({
                'id': cotizacion.id,
                'type': cotizacion.tipoSeguroPrincipal,
                'name': f"{cotizacion.nombres} {cotizacion.apellidos[0] if cotizacion.apellidos else ''}.",
                'location': cotizacion.canton,
                'status': 'Incompleta' if progreso < 100 else 'Completada',
                'details': detalles,
                'progress': progreso,
                # Se usa la fecha real de la base de datos
                'time': cotizacion.fecha_creacion.isoformat() + 'Z'
            })
            
        return jsonify(cotizaciones_lista), 200
    




    except Exception as e:
        print(f"ERROR al obtener cotizaciones: {e}")
        return jsonify({"mensaje": "Error al obtener las cotizaciones", "error": str(e)}), 500
    
# RUTA PARA OBTENER LOS DATOS DE UNA SOLA COTIZACIÓN POR SU ID
@app.route('/api/cotizaciones/<int:id>', methods=['GET'])
def obtener_cotizacion_por_id(id):
    try:
        cotizacion = Cotizacion.query.get(id)
        if not cotizacion:
            return jsonify({"mensaje": "Cotización no encontrada"}), 404
        
        # Convierte el objeto de la base de datos a un diccionario
        datos_cotizacion = {
            "id": cotizacion.id,
            "nombres": cotizacion.nombres,
            "apellidos": cotizacion.apellidos,
            "fechaNacimiento": cotizacion.fechaNacimiento,
            "sexo": cotizacion.sexo,
            "telefono": cotizacion.telefono,
            "email": cotizacion.email,
            "provincia": cotizacion.provincia,
            "canton": cotizacion.canton,
            "aceptaTerminos": cotizacion.aceptaTerminos,
            "aceptaPromociones": False, # Asume un valor si no está en el modelo
            "tipoSeguroSalud": cotizacion.tipoSeguroSalud,
            # Añade aquí cualquier otro campo que guardes en la BD y necesites en el form
        }
        return jsonify(datos_cotizacion), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener la cotización", "error": str(e)}), 500

# RUTA PARA ACTUALIZAR UNA COTIZACIÓN EXISTENTE
@app.route('/api/cotizaciones/<int:id>', methods=['PUT'])
def actualizar_cotizacion(id):
    try:
        cotizacion = Cotizacion.query.get(id)
        if not cotizacion:
            return jsonify({"mensaje": "Cotización no encontrada"}), 404

        datos = request.get_json()
        
        # Actualiza cada campo del objeto con los nuevos datos
        cotizacion.nombres = datos.get('nombres', cotizacion.nombres)
        cotizacion.apellidos = datos.get('apellidos', cotizacion.apellidos)
        cotizacion.fechaNacimiento = datos.get('fechaNacimiento', cotizacion.fechaNacimiento)
        cotizacion.sexo = datos.get('sexo', cotizacion.sexo)
        cotizacion.telefono = datos.get('telefono', cotizacion.telefono)
        cotizacion.email = datos.get('email', cotizacion.email)
        cotizacion.provincia = datos.get('provincia', cotizacion.provincia)
        cotizacion.canton = datos.get('canton', cotizacion.canton)
        cotizacion.aceptaTerminos = datos.get('aceptaTerminos', cotizacion.aceptaTerminos)

        db.session.commit() # Guarda los cambios en la base de datos
        return jsonify({"mensaje": "Cotización actualizada con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al actualizar la cotización", "error": str(e)}), 500
