# app.py

# --- Importaciones Necesarias ---
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from flask_migrate import Migrate

# --- Importaciones de nuestra aplicación ---
from database import db
from models import Cotizacion, Plan

# --- Configuración Inicial de la Aplicación ---
app = Flask(__name__)
CORS(app)

# --- Configuración de la Base de Datos ---
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'garantec.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Conecta nuestra instancia de la base de datos con la aplicación
db.init_app(app)

# Inicializa Flask-Migrate
migrate = Migrate(app, db)

# --- Definición de Rutas (Endpoints) ---

@app.route('/')
def hola_mundo():
    """
    Ruta de bienvenida para verificar que el servidor está funcionando.
    """
    return '¡Bienvenido a la API de Garantec con Flask! 🐍'


# --- RUTA UNIFICADA PARA MANEJAR COTIZACIONES (GET Y POST) ---
@app.route('/api/cotizaciones', methods=['GET', 'POST'])
def gestionar_cotizaciones():
    """
    Gestiona la obtención de todas las cotizaciones (GET) y la creación
    de una nueva cotización (POST).
    """
    if request.method == 'GET':
        try:
            todas_las_cotizaciones = Cotizacion.query.order_by(Cotizacion.fecha_creacion.desc()).all()
            
            cotizaciones_lista = []
            for cotizacion in todas_las_cotizaciones:
                
                # --- LÓGICA DE PROGRESO Y DETALLES MEJORADA ---
                progreso = 0
                detalles = "Cotización iniciada."
                status = "Incompleta"
                plan_info = None

                if cotizacion.plan_seleccionado_id:
                    plan = Plan.query.get(cotizacion.plan_seleccionado_id)
                    if plan:
                        progreso = 100
                        status = "Completada"
                        detalles = f"Plan: {plan.nombre}"
                        plan_info = { 'nombre': plan.nombre, 'aseguradora': plan.aseguradora, 'logo': f"https://placehold.co/150x50/eef2ff/4338ca?text={plan.aseguradora.replace(' ', '+')}" }
                else:
                    # --- NUEVA LÓGICA DE PROGRESO POR PASOS ---
                    campos_paso1 = []
                    campos_paso2 = []

                    if cotizacion.tipoSeguroPrincipal == 'Auto':
                        campos_paso1 = ['nombres', 'apellidos', 'cedula', 'telefono', 'email', 'provincia', 'canton', 'callePrincipal']
                        campos_paso2 = ['marcaVehiculo', 'modeloVehiculo', 'anioVehiculo', 'placaVehiculo']
                    elif cotizacion.tipoSeguroPrincipal == 'Vida':
                        campos_paso1 = ['nombres', 'apellidos', 'telefono', 'email', 'provincia', 'canton', 'callePrincipal']
                        campos_paso2 = ['ocupacion']
                    elif cotizacion.tipoSeguroPrincipal == 'Salud':
                        campos_paso1 = ['nombres', 'apellidos', 'telefono', 'email', 'provincia', 'canton', 'callePrincipal']
                        campos_paso2 = [] # Salud no tiene un paso 2 obligatorio definido

                    # Verificar si los pasos están completos
                    paso1_completo = all(getattr(cotizacion, campo) for campo in campos_paso1)
                    paso2_completo = all(getattr(cotizacion, campo) for campo in campos_paso2) if campos_paso2 else True

                    if paso1_completo and paso2_completo:
                        progreso = 85
                        detalles = "Listo para seleccionar plan"
                    elif paso1_completo:
                        progreso = 30
                        detalles = "Faltan datos del seguro"
                    else:
                        # Calcula un progreso parcial para el paso 1
                        campos_llenos_paso1 = sum(1 for campo in campos_paso1 if getattr(cotizacion, campo))
                        if campos_llenos_paso1 > 0:
                            progreso = 10 
                        else:
                            progreso = 0
                        detalles = "Faltan datos personales"

                apellido_inicial = f"{cotizacion.apellidos[0]}." if cotizacion.apellidos else ""
                
                cotizaciones_lista.append({
                    'id': cotizacion.id,
                    'sexo': cotizacion.sexo,
                    'type': cotizacion.tipoSeguroPrincipal,
                    'name': f"{cotizacion.nombres} {apellido_inicial}",
                    'nombres': cotizacion.nombres,
                    'apellidos': cotizacion.apellidos,
                    'email': cotizacion.email,
                    'phone': cotizacion.telefono,
                    'notes': f"Cotización de {cotizacion.tipoSeguroPrincipal or 'seguro'} iniciada.",
                    'location': cotizacion.canton,
                    'status': status,
                    'details': detalles,
                    'progress': progreso,
                    'time': cotizacion.fecha_creacion.isoformat() + 'Z',
                    'plan_info': plan_info,
                    'precio_final': f"${cotizacion.precio_final:.2f} /mes" if cotizacion.precio_final else None
                })
            
            return jsonify(cotizaciones_lista), 200
        except Exception as e:
            print(f"ERROR al obtener cotizaciones: {e}")
            return jsonify({"mensaje": "Error al obtener las cotizaciones", "error": str(e)}), 500

    if request.method == 'POST':
        datos = request.get_json()
        try:
            campos_modelo = [c.name for c in Cotizacion.__table__.columns]
            datos_filtrados = {k: v for k, v in datos.items() if k in campos_modelo}
            nueva_cotizacion = Cotizacion(**datos_filtrados)
            db.session.add(nueva_cotizacion)
            db.session.commit()
            return jsonify({'mensaje': '¡Cotización guardada!', 'id_cotizacion': nueva_cotizacion.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'mensaje': 'Error al guardar', 'error': str(e)}), 500
    
# RUTA PARA OBTENER Y ACTUALIZAR UNA SOLA COTIZACIÓN (GET Y PUT)
@app.route('/api/cotizaciones/<int:id>', methods=['GET', 'PUT'])
def gestionar_cotizacion_individual(id):
    cotizacion = Cotizacion.query.get_or_404(id)

    if request.method == 'GET':
        try:
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
                "parroquia": cotizacion.parroquia,
                "callePrincipal": cotizacion.callePrincipal,
                "calleSecundaria": cotizacion.calleSecundaria,
                "numeroCasa": cotizacion.numeroCasa,
                "referencias": cotizacion.referencias,
                "aceptaTerminos": cotizacion.aceptaTerminos,
                "cedula": cotizacion.cedula,
                "tipoSeguroPrincipal": cotizacion.tipoSeguroPrincipal,
                "tipoSeguroSalud": cotizacion.tipoSeguroSalud,
                "tipoSeguroVida": cotizacion.tipoSeguroVida,
                "tipoSeguroAuto": cotizacion.tipoSeguroAuto,
                "ocupacion": cotizacion.ocupacion,
                "marcaVehiculo": cotizacion.marcaVehiculo,
                "modeloVehiculo": cotizacion.modeloVehiculo,
                "anioVehiculo": cotizacion.anioVehiculo,
                "placaVehiculo": cotizacion.placaVehiculo,
                "plan_seleccionado_id": cotizacion.plan_seleccionado_id,
                "precio_final": cotizacion.precio_final,
            }
            return jsonify(datos_cotizacion), 200
        except Exception as e:
            return jsonify({"mensaje": "Error al obtener la cotización", "error": str(e)}), 500

    if request.method == 'PUT':
        try:
            datos = request.get_json()
            
            for key, value in datos.items():
                if hasattr(cotizacion, key):
                    setattr(cotizacion, key, value)

            db.session.commit()
            return jsonify({"mensaje": "Cotización actualizada con éxito"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"mensaje": "Error al actualizar la cotización", "error": str(e)}), 500

# --- RUTA PARA OBTENER LOS PLANES DE SEGURO ---
@app.route('/api/planes', methods=['GET'])
def obtener_planes():
    tipo = request.args.get('tipo', 'Salud')
    try:
        planes = Plan.query.filter_by(tipo_seguro=tipo).all()
        planes_lista = [
            {
                'id': plan.id,
                'logo': f"https://placehold.co/150x50/eef2ff/4338ca?text={plan.aseguradora.replace(' ', '+')}",
                'name': plan.nombre,
                'price': f"${plan.precio:.2f} / mes",
                'details': plan.detalles.split(';') if plan.detalles else []
            } for plan in planes
        ]
        return jsonify(planes_lista)
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener planes", "error": str(e)}), 500


# --- AÑADIDO: Nueva ruta específica para Oportunidades ---
@app.route('/api/oportunidades', methods=['GET'])
def obtener_oportunidades():
    """
    Devuelve todas las cotizaciones con el formato específico requerido
    por la página de Oportunidades.
    """
    try:
        todas_las_cotizaciones = Cotizacion.query.order_by(Cotizacion.fecha_creacion.desc()).all()
        oportunidades_lista = []
        for cotizacion in todas_las_cotizaciones:
            
            # Valores por defecto
            estado_oportunidad = "Pendiente"
            valor_estimado = 0.0
            prioridad = "Baja" # Inicia como 'Baja' por defecto

            if cotizacion.plan_seleccionado_id:
                plan = Plan.query.get(cotizacion.plan_seleccionado_id)
                if plan:
                    estado_oportunidad = "Aceptada"
                    valor_estimado = cotizacion.precio_final or plan.precio
                    prioridad = "Media" # Una oportunidad cerrada es de prioridad media para seguimiento
            else:
                # Lógica para cotizaciones incompletas
                campos_requeridos = {}
                if cotizacion.tipoSeguroPrincipal == 'Auto':
                    campos_requeridos = {'nombres': 1, 'apellidos': 1, 'marcaVehiculo': 2}
                elif cotizacion.tipoSeguroPrincipal == 'Vida':
                    campos_requeridos = {'nombres': 1, 'apellidos': 1, 'ocupacion': 2}
                elif cotizacion.tipoSeguroPrincipal == 'Salud':
                    campos_requeridos = {'nombres': 1, 'apellidos': 1}
                
                if campos_requeridos:
                    campos_llenos = sum(1 for campo in campos_requeridos if getattr(cotizacion, campo))
                    progreso = int((campos_llenos / len(campos_requeridos)) * 100) if len(campos_requeridos) > 0 else 0
                    
                    # --- LÓGICA DE PRIORIDAD CORREGIDA ---
                    if progreso >= 75:
                        estado_oportunidad = "Por confirmar"
                        prioridad = "Alta"
                    elif progreso > 30: # Progreso intermedio
                        estado_oportunidad = "Pendiente"
                        prioridad = "Media"
                    elif progreso <= 30 : # Progreso bajo o cero
                        estado_oportunidad = "Pendiente"
                        prioridad = "Baja" # Ahora sí se asignará correctamente

            oportunidades_lista.append({
                'id': cotizacion.id,
                'nombre': f"{cotizacion.nombres} {cotizacion.apellidos}",
                'tipoSeguro': cotizacion.tipoSeguroPrincipal,
                'email': cotizacion.email,
                'telefono': cotizacion.telefono,
                'estadoCotizacion': estado_oportunidad,
                'valorEstimado': valor_estimado,
                'fechaContacto': cotizacion.fecha_creacion.isoformat() + 'Z',
                'prioridad': prioridad
            })
        
        return jsonify(oportunidades_lista), 200
    except Exception as e:
        print(f"ERROR al obtener oportunidades: {e}")
        return jsonify({"mensaje": "Error al obtener oportunidades", "error": str(e)}), 500
