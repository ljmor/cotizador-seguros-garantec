import React, { useState, useEffect } from 'react';
import { FaCar, FaShieldAlt } from 'react-icons/fa';
import { MdDirectionsCar } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

// --- Datos para los Dropdowns de Ubicación ---
const ubicacionesEcuador = {
    Azuay: ["Cuenca", "Gualaceo", "Paute", "Sígsig"],
    Bolívar: ["Guaranda", "Chillanes", "San Miguel"],
    Cañar: ["Azogues", "Biblián", "Cañar"],
    Carchi: ["Tulcán", "Espejo", "Mira"],
    Chimborazo: ["Riobamba", "Alausi", "Guano"],
    Cotopaxi: ["Latacunga", "Pujilí", "Salcedo"],
    "El Oro": ["Machala", "Pasaje", "Santa Rosa"],
    Esmeraldas: ["Esmeraldas", "Atacames", "Muisne"],
    Galápagos: ["Puerto Baquerizo Moreno", "Santa Cruz"],
    Guayas: ["Guayaquil", "Durán", "Samborondón", "Daule"],
    Imbabura: ["Ibarra", "Otavalo", "Cotacachi"],
    Loja: ["Loja", "Catamayo", "Macará", "Saraguro"],
    "Los Ríos": ["Babahoyo", "Quevedo", "Vinces"],
    Manabí: ["Portoviejo", "Manta", "Chone"],
    "Morona Santiago": ["Macas", "Gualaquiza", "Sucúa"],
    Napo: ["Tena", "Archidona"],
    Orellana: ["Francisco de Orellana", "La Joya de los Sachas"],
    Pastaza: ["Puyo", "Mera"],
    Pichincha: ["Quito", "Cayambe", "Mejía", "Rumiñahui"],
    "Santa Elena": ["Santa Elena", "La Libertad", "Salinas"],
    "Santo Domingo de los Tsáchilas": ["Santo Domingo"],
    Sucumbíos: ["Nueva Loja", "Lago Agrio"],
    Tungurahua: ["Ambato", "Baños de Agua Santa", "Pelileo"],
    "Zamora Chinchipe": ["Zamora", "Yantzaza", "Zumba"],
};

const provincias = Object.keys(ubicacionesEcuador);

// --- Componente de Modal de Alerta Estilizado ---
const AlertModal = ({ notification, onClose }) => {
    if (!notification.isVisible) return null;
    const title = notification.type === 'success' ? 'Éxito' : 'Campos Requeridos';
    const titleColor = notification.type === 'success' ? 'text-green-600' : 'text-red-600';
    return (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-4 border-t-4 border-[#6074F3]">
                <h3 className={`text-xl font-bold ${titleColor} mb-4`}>{title}</h3>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{notification.message}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-2 bg-[#6074F3] text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                    Entendido
                </motion.button>
            </div>
        </div>
    );
};

// --- Iconos SVG ---
const BackArrowIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> );
const CheckCircleIcon = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const PlusCircleIcon = ({ onClick }) => ( <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const ComprehensiveIcon = () => <FaShieldAlt className="h-8 w-8 mx-auto mb-2 text-blue-500" />;
const LiabilityIcon = () => <MdDirectionsCar className="h-8 w-8 mx-auto mb-2 text-orange-500" />;
const ThirdPartyIcon = () => <FaCar className="h-8 w-8 mx-auto mb-2 text-green-500" />;

// --- Componentes Reutilizables ---
const FormInput = ({ label, required, ...props }) => ( <div><label className="block text-sm font-medium text-gray-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label><input {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" /></div> );
const FormSelect = ({ label, required, children, ...props }) => ( <div><label className="block text-sm font-medium text-gray-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label><select {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">{children}</select></div> );
const StepBar = ({ steps, currentStep }) => ( <div className="flex items-center w-full mb-8">{steps.map((step, index) => ( <React.Fragment key={step}><div className="flex flex-col items-center"><div className={`w-full text-center text-sm font-semibold ${index <= currentStep ? 'text-teal-500' : 'text-gray-400'}`}>{step}</div></div>{index < steps.length - 1 && (<div className={`flex-auto border-t-2 transition-colors duration-500 mx-4 ${index < currentStep ? 'border-teal-400' : 'border-gray-200'}`}></div>)}</React.Fragment>))}</div> );
const InsuranceTypeCard = ({ icon, label, selected, onClick }) => ( <motion.div whileHover={{ y: -5 }} onClick={onClick} className={`relative text-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${selected ? 'bg-white border-teal-400 shadow-lg scale-105' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'}`}> {selected && <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-teal-400" />} {icon} <span className="text-sm font-semibold text-gray-700">{label}</span> </motion.div> );

// --- Componentes de Pasos del Formulario ---
const PersonalDataStep = ({ onNext, onSaveContact, formData, handleChange }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulario de Seguro</h2>
        <p className="text-gray-500 mb-6">Datos personales del propietario</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput required label="Nombres completos" type="text" name="nombres" value={formData.nombres || ''} onChange={handleChange} />
            <FormInput required label="Apellidos completos" type="text" name="apellidos" value={formData.apellidos || ''} onChange={handleChange} />
            <FormInput label="Fecha de nacimiento" type="date" name="fechaNacimiento" value={formData.fechaNacimiento || ''} onChange={handleChange} />
            <FormInput required label="Cédula de identidad" type="text" name="cedula" value={formData.cedula || ''} onChange={handleChange} />
            <FormInput required label="Teléfono" type="text" name="telefono" value={formData.telefono || ''} onChange={handleChange} />
            <FormInput required label="E-mail" type="email" name="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        <p className="text-gray-500 my-6">Dirección de domicilio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect required label="Provincia" name="provincia" value={formData.provincia || ''} onChange={handleChange}><option value="">Seleccione una provincia</option>{provincias.map(p => <option key={p} value={p}>{p}</option>)}</FormSelect>
            <FormSelect required label="Cantón / Ciudad" name="canton" value={formData.canton || ''} onChange={handleChange} disabled={!formData.provincia}><option value="">Seleccione un cantón</option>{formData.provincia && ubicacionesEcuador[formData.provincia].map(c => <option key={c} value={c}>{c}</option>)}</FormSelect>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormInput label="Parroquia" type="text" name="parroquia" placeholder="Especifique la parroquia" value={formData.parroquia || ''} onChange={handleChange} />
            <FormInput required label="Calle Principal" type="text" name="callePrincipal" value={formData.callePrincipal || ''} onChange={handleChange} />
            <FormInput label="Calle Secundaria" type="text" name="calleSecundaria" value={formData.calleSecundaria || ''} onChange={handleChange} />
            <FormInput label="Número de Casa/Dpto." type="text" name="numeroCasa" value={formData.numeroCasa || ''} onChange={handleChange} />
        </div>
        <div className="mt-4"><FormInput label="Referencias" type="text" name="referencias" placeholder="Ej: Frente a la tienda..." value={formData.referencias || ''} onChange={handleChange} /></div>
        <div className="mt-6 space-y-3">
            <label className="flex items-center"><input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos || false} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><span className="ml-2 text-sm text-gray-600">Acepta los <a href="#" className="font-medium text-indigo-600 hover:underline">Términos y condiciones</a></span></label>
        </div>
        <div className="flex justify-end gap-3 mt-8">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onSaveContact} className="px-6 py-2 rounded-lg text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition">Guardar contacto</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext} disabled={!formData.aceptaTerminos} className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow disabled:opacity-50 disabled:cursor-not-allowed">Siguiente</motion.button>
        </div>
    </>
);

const VehicleDataStep = ({ onQuote, formData, handleChange }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Información del vehículo</h2>
        <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect required label="Marca del vehículo" name="marcaVehiculo" value={formData.marcaVehiculo || ''} onChange={handleChange}><option value="">Seleccione la marca</option><option>Toyota</option><option>Chevrolet</option><option>Nissan</option><option>Ford</option></FormSelect>
                <FormInput required label="Modelo" type="text" name="modeloVehiculo" placeholder="Ej: Corolla, Aveo, Sentra" value={formData.modeloVehiculo || ''} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput required label="Año" type="number" name="anioVehiculo" placeholder="2020" min="1990" max="2025" value={formData.anioVehiculo || ''} onChange={handleChange} />
                <FormInput required label="Placa" type="text" name="placaVehiculo" placeholder="ABC-1234" value={formData.placaVehiculo || ''} onChange={handleChange} />
            </div>
        </div>
        <div className="flex justify-end mt-8">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onQuote} className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg">Cotizar</motion.button>
        </div>
    </>
);

const ComparisonStep = ({ onSelectPlan }) => {
    const [planes, setPlanes] = useState([]);
    const [cargandoPlanes, setCargandoPlanes] = useState(true);

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const respuesta = await fetch('http://localhost:5000/api/planes?tipo=Auto');
                if (!respuesta.ok) throw new Error("Error al cargar planes");
                const data = await respuesta.json();
                setPlanes(data);
            } catch (error) {
                console.error("Error al cargar planes:", error);
            } finally {
                setCargandoPlanes(false);
            }
        };
        fetchPlanes();
    }, []);

    if (cargandoPlanes) {
        return <div className="p-8 text-center text-xl font-semibold">Cargando planes disponibles...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Planes de Auto Disponibles</h1>
            <p className="text-gray-500 mt-1 mb-8">Selecciona la mejor opción de seguro de Auto para ti.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {planes.map((plan) => (
                    <motion.div key={plan.id} whileHover={{ y: -5 }} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex-grow">
                            <div className="flex justify-center mb-4"><img src={plan.logo} alt={`Logo de ${plan.name}`} className="h-12"/></div>
                            <h3 className="text-xl font-bold text-center text-gray-800">{plan.name}</h3>
                            <p className="text-lg font-semibold text-center text-gray-600 my-2">{plan.price}</p>
                            <ul className="text-sm text-gray-500 space-y-2 mt-4 list-disc list-inside">
                                {plan.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                        <div className="mt-6 text-center text-xs space-x-2">
                            <a href="#" className="text-indigo-600 hover:underline">Descargar plan</a><span>•</span><a href="#" className="text-indigo-600 hover:underline">Compartir plan</a>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectPlan(plan.id, parseFloat(plan.price.replace(/[^0-9.,]/g, '').replace(',', '.')))}
                            className="w-full mt-4 py-3 rounded-lg bg-teal-400 text-white font-bold hover:bg-teal-500 transition shadow"
                        >
                            Seleccionar este plan
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Componente Principal del Formulario ---
export default function Form_Auto({ navigateTo, cotizacionIdParaEditar = null }) {
    const [step, setStep] = useState('form1');
    const [cotizacionId, setCotizacionId] = useState(cotizacionIdParaEditar);
    const [cargando, setCargando] = useState(!!cotizacionIdParaEditar);
    const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'error' });

    const [formData, setFormData] = useState({
        tipoSeguroPrincipal: 'Auto',
        tipoSeguroAuto: 'integral',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        cedula: '',
        telefono: '',
        email: '',
        provincia: '',
        canton: '',
        parroquia: '',
        callePrincipal: '',
        calleSecundaria: '',
        numeroCasa: '',
        referencias: '',
        aceptaTerminos: false,
        marcaVehiculo: '',
        modeloVehiculo: '',
        anioVehiculo: '',
        placaVehiculo: '',
        plan_seleccionado_id: null,
        precio_final: null
    });

    const stepLabels = ['Personal', 'Vehículo', 'Planes'];
    const stepMap = { form1: 0, form2: 1, comparison: 2 };
    const currentStepIndex = stepMap[step];

    useEffect(() => { const cargarDatosParaEditar = async (id) => { setCargando(true); try { const respuesta = await fetch(`http://localhost:5000/api/cotizaciones/${id}`); if (!respuesta.ok) throw new Error("No se encontró la cotización para editar"); const datosExistentes = await respuesta.json(); setFormData(prevState => ({ ...prevState, ...datosExistentes })); } catch (error) { console.error("Error al cargar datos para editar:", error); navigateTo('landing'); } finally { setCargando(false); } }; if (cotizacionIdParaEditar) { cargarDatosParaEditar(cotizacionIdParaEditar); } }, [cotizacionIdParaEditar, navigateTo]);

    const handleChange = (e) => { const { name, value, type, checked } = e.target; if (name === 'provincia') { setFormData(prevState => ({ ...prevState, provincia: value, canton: '' })); } else { setFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value })); } };

    const guardarProgreso = async () => { const esActualizacion = !!cotizacionId; const url = esActualizacion ? `http://localhost:5000/api/cotizaciones/${cotizacionId}` : 'http://localhost:5000/api/cotizaciones'; const method = esActualizacion ? 'PUT' : 'POST'; try { const respuesta = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData), }); if (!respuesta.ok) throw new Error('Error al guardar el progreso'); const resultado = await respuesta.json(); if (!esActualizacion) { setCotizacionId(resultado.id_cotizacion); } return true; } catch (error) { console.error("Error al guardar progreso:", error); return false; } };

    const validarCampos = (pasoActual) => {
        const camposRequeridosPaso1 = { nombres: 'Nombres completos', apellidos: 'Apellidos completos', cedula: 'Cédula de identidad', telefono: 'Teléfono', email: 'E-mail', provincia: 'Provincia', canton: 'Cantón / Ciudad', callePrincipal: 'Calle Principal' };
        const camposRequeridosPaso2 = { marcaVehiculo: 'Marca del vehículo', modeloVehiculo: 'Modelo', anioVehiculo: 'Año', placaVehiculo: 'Placa' };
        const camposAValidar = pasoActual === 'form1' ? camposRequeridosPaso1 : camposRequeridosPaso2;
        const camposFaltantes = [];
        for (const campo in camposAValidar) { if (!formData[campo]) { camposFaltantes.push(camposAValidar[campo]); } }
        if (camposFaltantes.length > 0) { setNotification({ isVisible: true, message: `Por favor, complete los siguientes campos obligatorios:\n- ${camposFaltantes.join('\n- ')}`, type: 'error' }); return false; }
        return true;
    }

    const handleNext = async () => { if (!validarCampos('form1')) return; await guardarProgreso(); setStep('form2'); };
    const handleSaveContact = async () => { if (!validarCampos('form1')) return; const guardadoExitoso = await guardarProgreso(); if (guardadoExitoso) { setNotification({ isVisible: true, message: '¡Progreso guardado con éxito!', type: 'success' }); } else { setNotification({ isVisible: true, message: 'No se pudo guardar el contacto. Intente de nuevo.', type: 'error' }); } };
    const handleQuote = async () => { if (!validarCampos('form2')) return; await guardarProgreso(); setStep('comparison'); };

    const handleSelectPlan = async (planId, planPrice) => {
        if (!cotizacionId) {
            setNotification({ isVisible: true, message: 'No se ha podido guardar el progreso inicial. Por favor, vuelva a empezar.', type: 'error' });
            return;
        }
        const finalFormData = { ...formData, plan_seleccionado_id: planId, precio_final: planPrice };
        setFormData(finalFormData);
        try {
            const respuesta = await fetch(`http://localhost:5000/api/cotizaciones/${cotizacionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalFormData),
            });
            if (!respuesta.ok) throw new Error('Error al guardar el plan seleccionado');
            setNotification({ isVisible: true, message: '¡Plan seleccionado y guardado con éxito!', type: 'success' });
            setTimeout(() => navigateTo('landing'), 2000);
        } catch (error) {
            console.error("Error al guardar el plan:", error);
            setNotification({ isVisible: true, message: 'Hubo un problema al guardar tu selección.', type: 'error' });
        }
    };

    const handleBack = () => { if (step === 'comparison') setStep('form2'); else if (step === 'form2') setStep('form1'); else if (step === 'form1') navigateTo('landing'); };

    if (cargando) { return <div className="p-8 text-center text-xl font-semibold">Cargando datos de la cotización...</div>; }

    const stepVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, };

    return (
        <div className="bg-white font-sans w-full h-full flex flex-col min-h-screen">
            <AlertModal notification={notification} onClose={() => setNotification({ isVisible: false, message: '', type: 'error' })} />
            <div className="flex flex-col lg:flex-row flex-grow">
                <main className="w-full lg:w-2/3 bg-slate-50 p-6 sm:p-8 md:p-12 overflow-y-auto">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-8 transition">
                        <BackArrowIcon /> Volver
                    </button>

                    {step !== 'comparison' && (<StepBar steps={stepLabels} currentStep={currentStepIndex} />)}

                    {step !== 'comparison' && (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Auto</h1>
                            <p className="text-gray-500 mt-2 mb-6">Seleccione el tipo de seguro de Auto</p>
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <InsuranceTypeCard icon={<ComprehensiveIcon/>} label="Integral" selected={formData.tipoSeguroAuto === 'integral'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'integral', type: 'button' }})} />
                                <InsuranceTypeCard icon={<ThirdPartyIcon/>} label="Contra terceros" selected={formData.tipoSeguroAuto === 'terceros'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'terceros', type: 'button' }})} />
                                <InsuranceTypeCard icon={<LiabilityIcon/>} label="Responsabilidad" selected={formData.tipoSeguroAuto === 'responsabilidad'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'responsabilidad', type: 'button' }})} />
                            </div>
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 'form1' && (
                            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                                <PersonalDataStep onNext={handleNext} onSaveContact={handleSaveContact} formData={formData} handleChange={handleChange} />
                            </motion.div>
                        )}
                        {step === 'form2' && (
                            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                                <VehicleDataStep onQuote={handleQuote} formData={formData} handleChange={handleChange} />
                            </motion.div>
                        )}
                        {step === 'comparison' && (
                            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                                <ComparisonStep onSelectPlan={handleSelectPlan} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <aside className="hidden lg:block w-1/3 bg-[#6074F3] p-8 sticky top-0 h-screen">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full bg-gray-300 rounded-2xl shadow-2xl overflow-hidden aspect-w-9 aspect-h-16">
                            <img src="/src/assets/img_form_auto.png" alt="Auto moderno en carretera" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center mt-6 text-3xl font-bold text-white tracking-wider">abc<span className="font-light">seguros</span></p>
                    </div>
                </aside>
            </div>
        </div>
    );
}