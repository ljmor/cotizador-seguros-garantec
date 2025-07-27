import React, { useState, useEffect } from 'react';
import { FaCar, FaShieldAlt } from 'react-icons/fa';
import { MdDirectionsCar } from 'react-icons/md';

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

// --- Componente de Notificación Flotante (Toast) ---
const AlertNotification = ({ notification, onClose }) => {
    if (!notification.isVisible) return null;

    const baseClasses = "fixed top-24 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg max-w-sm transition-transform duration-300 ease-in-out";
    const typeClasses = {
        error: "bg-red-100 border-l-4 border-red-500 text-red-800",
        success: "bg-green-100 border-l-4 border-green-500 text-green-800",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[notification.type] || typeClasses.error}`} role="alert">
            <div className="ml-3 text-sm font-medium whitespace-pre-line">
                {notification.message}
            </div>
            <button onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-500 hover:bg-gray-200 focus:outline-none">
                <span className="sr-only">Cerrar</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};


// --- Iconos SVG ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
const CheckCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);
const PlusCircleIcon = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Componentes para los iconos de tipo de seguro de auto ---
const ComprehensiveIcon = () => <FaShieldAlt className="h-8 w-8 mx-auto mb-2 text-blue-500" />;
const LiabilityIcon = () => <MdDirectionsCar className="h-8 w-8 mx-auto mb-2 text-orange-500" />;
const ThirdPartyIcon = () => <FaCar className="h-8 w-8 mx-auto mb-2 text-green-500" />;

// --- Datos de ejemplo para la pantalla de comparación ---
const comparisonData = [
    { logo: "https://placehold.co/150x50/e0e7ff/3730a3?text=Sweaden", name: "Seguro Auto Básico", price: "$45,90 / mes", details: ["Cobertura por daños: $50000", "Responsabilidad civil: $100000", "Asistencia en carretera 24/7", "Robo total: $30000"]},
    { logo: "https://placehold.co/150x50/fffbeb/b45309?text=Hispana+Seguros", name: "Seguro Auto Plus", price: "$68,90 / mes", details: ["Cobertura por daños: $80000", "Responsabilidad civil: $150000", "Asistencia en carretera 24/7", "Robo total: $50000"]},
    { logo: "https://placehold.co/150x50/e0f2fe/0891b2?text=Latina+Seguros", name: "Seguro Auto Premium", price: "$89,90 / mes", details: ["Cobertura por daños: $120000", "Responsabilidad civil: $200000", "Asistencia en carretera 24/7", "Robo total: $80000"]}
];

// --- Componentes Reutilizables ---
const FormInput = ({ label, required, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
    </div>
);
const FormSelect = ({ label, required, children, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            {children}
        </select>
    </div>
);
const InsuranceTypeCard = ({ icon, label, selected, onClick }) => (
    <div onClick={onClick} className={`relative text-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${ selected ? 'bg-white border-teal-400 shadow-lg scale-105' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'}`}>
        {selected && <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-teal-400" />}
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
);
const StepBar = ({ steps, currentStep }) => (
    <div className="flex items-center w-full mb-8">
        {steps.map((step, index) => (
            <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                    <div className={`w-full text-center text-sm font-semibold ${index <= currentStep ? 'text-teal-500' : 'text-gray-400'}`}>{step}</div>
                </div>
                {index < steps.length - 1 && (<div className={`flex-auto border-t-2 transition-colors duration-500 mx-4 ${index < currentStep ? 'border-teal-400' : 'border-gray-200'}`}></div>)}
            </React.Fragment>
        ))}
    </div>
);

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
            <FormSelect required label="Provincia" name="provincia" value={formData.provincia || ''} onChange={handleChange}>
                <option value="">Seleccione una provincia</option>
                {provincias.map(p => <option key={p} value={p}>{p}</option>)}
            </FormSelect>
            <FormSelect required label="Cantón / Ciudad" name="canton" value={formData.canton || ''} onChange={handleChange} disabled={!formData.provincia}>
                <option value="">Seleccione un cantón</option>
                {formData.provincia && ubicacionesEcuador[formData.provincia].map(c => <option key={c} value={c}>{c}</option>)}
            </FormSelect>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormInput label="Parroquia" type="text" name="parroquia" placeholder="Especifique la parroquia" value={formData.parroquia || ''} onChange={handleChange} />
            <FormInput required label="Calle Principal" type="text" name="callePrincipal" value={formData.callePrincipal || ''} onChange={handleChange} />
            <FormInput label="Calle Secundaria" type="text" name="calleSecundaria" value={formData.calleSecundaria || ''} onChange={handleChange} />
            <FormInput label="Número de Casa/Dpto." type="text" name="numeroCasa" value={formData.numeroCasa || ''} onChange={handleChange} />
        </div>
         <div className="mt-4">
             <FormInput label="Referencias" type="text" name="referencias" placeholder="Ej: Frente a la tienda..." value={formData.referencias || ''} onChange={handleChange} />
        </div>
        <div className="mt-6 space-y-3">
            <label className="flex items-center"><input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos || false} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><span className="ml-2 text-sm text-gray-600">Acepta los <a href="#" className="font-medium text-indigo-600 hover:underline">Términos y condiciones</a></span></label>
        </div>
        <div className="flex justify-end gap-3 mt-8">
            <button onClick={onSaveContact} className="px-6 py-2 rounded-lg text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition">Guardar contacto</button>
            <button onClick={onNext} className="px-6 py-2 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition shadow">Siguiente</button>
        </div>
    </>
);

const VehicleDataStep = ({ onQuote, formData, handleChange }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Información del vehículo y conductores</h2>
        <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect required label="Marca del vehículo" name="marcaVehiculo" value={formData.marcaVehiculo || ''} onChange={handleChange}>
                    <option value="">Seleccione la marca</option>
                    <option>Toyota</option>
                    <option>Chevrolet</option>
                    <option>Nissan</option>
                </FormSelect>
                <FormInput required label="Modelo" type="text" name="modeloVehiculo" placeholder="Ej: Corolla, Aveo, Sentra" value={formData.modeloVehiculo || ''} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput required label="Año" type="number" name="anioVehiculo" placeholder="2020" min="1990" max="2025" value={formData.anioVehiculo || ''} onChange={handleChange} />
                <FormInput required label="Placa" type="text" name="placaVehiculo" placeholder="ABC-1234" value={formData.placaVehiculo || ''} onChange={handleChange} />
            </div>
        </div>
        <div className="flex justify-end mt-8">
            <button onClick={onQuote} className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg">Cotizar</button>
        </div>
    </>
);

const ComparisonStep = () => (
    <div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Auto</h1>
        <p className="text-gray-500 mt-1 mb-8">Seleccione la mejor opción de seguro de Auto</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisonData.map((plan, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex-grow">
                        <div className="flex justify-center mb-4"><img src={plan.logo} alt={`Logo de ${plan.name}`} className="h-12"/></div>
                        <h3 className="text-xl font-bold text-center text-gray-800">{plan.name}</h3>
                        <p className="text-lg font-semibold text-center text-gray-600 my-2">{plan.price}</p>
                        <ul className="text-sm text-gray-500 space-y-2 mt-4 list-disc list-inside">{plan.details.map((detail, i) => <li key={i}>{detail}</li>)}</ul>
                    </div>
                    <div className="mt-6 text-center text-xs space-x-2"><a href="#" className="text-indigo-600 hover:underline">Descargar plan</a><span>•</span><a href="#" className="text-indigo-600 hover:underline">Compartir plan</a></div>
                    <button className="w-full mt-4 py-3 rounded-lg bg-teal-400 text-white font-bold hover:bg-teal-500 transition shadow">Seleccionar este plan</button>
                </div>
            ))}
        </div>
    </div>
);

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
    });
    
    const stepLabels = ['Personal', 'Vehículo', 'Planes'];
    const stepMap = { form1: 0, form2: 1, comparison: 2 };
    const currentStepIndex = stepMap[step];

    useEffect(() => {
        const cargarDatosParaEditar = async (id) => {
            setCargando(true);
            try {
                const respuesta = await fetch(`http://localhost:5000/api/cotizaciones/${id}`);
                if (!respuesta.ok) throw new Error("No se encontró la cotización para editar");
                const datosExistentes = await respuesta.json();
                setFormData(prevState => ({ ...prevState, ...datosExistentes }));
            } catch (error) {
                console.error("Error al cargar datos para editar:", error);
                navigateTo('landing');
            } finally {
                setCargando(false);
            }
        };
        if (cotizacionIdParaEditar) {
            cargarDatosParaEditar(cotizacionIdParaEditar);
        }
    }, [cotizacionIdParaEditar, navigateTo]);

    useEffect(() => {
        if (notification.isVisible) {
            const timer = setTimeout(() => {
                setNotification({ isVisible: false, message: '', type: 'error' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'provincia') {
            setFormData(prevState => ({
                ...prevState,
                provincia: value,
                canton: ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const guardarProgreso = async () => {
        const esActualizacion = !!cotizacionId;
        const url = esActualizacion ? `http://localhost:5000/api/cotizaciones/${cotizacionId}` : 'http://localhost:5000/api/cotizaciones';
        const method = esActualizacion ? 'PUT' : 'POST';

        try {
            const respuesta = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!respuesta.ok) throw new Error('Error al guardar el progreso');
            const resultado = await respuesta.json();
            if (!esActualizacion) {
                setCotizacionId(resultado.id_cotizacion);
            }
            return true;
        } catch (error) {
            console.error("Error al guardar progreso:", error);
            return false;
        }
    };

    const validarCampos = (pasoActual) => {
        const camposRequeridosPaso1 = {
            nombres: 'Nombres completos',
            apellidos: 'Apellidos completos',
            cedula: 'Cédula de identidad',
            telefono: 'Teléfono',
            email: 'E-mail',
            provincia: 'Provincia',
            canton: 'Cantón / Ciudad',
            callePrincipal: 'Calle Principal'
        };

        const camposRequeridosPaso2 = {
            marcaVehiculo: 'Marca del vehículo',
            modeloVehiculo: 'Modelo',
            anioVehiculo: 'Año',
            placaVehiculo: 'Placa'
        };

        const camposAValidar = pasoActual === 'form1' ? camposRequeridosPaso1 : camposRequeridosPaso2;
        const camposFaltantes = [];

        for (const campo in camposAValidar) {
            if (!formData[campo]) {
                camposFaltantes.push(camposAValidar[campo]);
            }
        }

        if (camposFaltantes.length > 0) {
            setNotification({
                isVisible: true,
                message: `Por favor, complete los siguientes campos obligatorios:\n- ${camposFaltantes.join('\n- ')}`,
                type: 'error'
            });
            return false;
        }
        return true;
    }
    
    const handleNext = async () => {
        if (!validarCampos('form1')) return;
        await guardarProgreso();
        setStep('form2');
    };

    const handleSaveContact = async () => {
        if (!validarCampos('form1')) return;
        const guardadoExitoso = await guardarProgreso();
        if (guardadoExitoso) {
            setNotification({
                isVisible: true,
                message: '¡Progreso guardado con éxito!',
                type: 'success'
            });
        } else {
             setNotification({
                isVisible: true,
                message: 'No se pudo guardar el contacto. Intente de nuevo.',
                type: 'error'
            });
        }
    };
    
    const handleQuote = async () => {
        if (!validarCampos('form2')) return;
        await guardarProgreso();
        setStep('comparison');
    };

    const handleBack = () => {
        if (step === 'comparison') setStep('form2');
        else if (step === 'form2') setStep('form1');
        else if (step === 'form1') navigateTo('landing'); 
    };
    
    if (cargando) {
        return <div className="p-8 text-center text-xl font-semibold">Cargando datos de la cotización...</div>;
    }
    
    return (
        <div className="bg-white font-sans w-full h-full flex flex-col">
            <AlertNotification notification={notification} onClose={() => setNotification({ isVisible: false, message: '', type: 'error' })} />
            
            <div className="flex flex-col lg:flex-row flex-grow">
                <main className="w-full lg:w-2/3 bg-slate-50 p-6 sm:p-8 md:p-12 overflow-y-auto">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-8 transition">
                        <BackArrowIcon /> Volver
                    </button>
                    
                    {step !== 'comparison' && (
                         <>
                             <StepBar steps={stepLabels} currentStep={currentStepIndex} />
                             <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Auto</h1>
                             <p className="text-gray-500 mt-2 mb-6">Seleccione el tipo de seguro de Auto</p>
                             <div className="grid grid-cols-3 gap-4 mb-10">
                                 <InsuranceTypeCard icon={<ComprehensiveIcon/>} label="Integral" selected={formData.tipoSeguroAuto === 'integral'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'integral' }})} />
                                 <InsuranceTypeCard icon={<ThirdPartyIcon/>} label="Contra terceros" selected={formData.tipoSeguroAuto === 'terceros'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'terceros' }})} />
                                 <InsuranceTypeCard icon={<LiabilityIcon/>} label="Responsabilidad" selected={formData.tipoSeguroAuto === 'responsabilidad'} onClick={() => handleChange({ target: { name: 'tipoSeguroAuto', value: 'responsabilidad' }})} />
                             </div>
                         </>
                    )}

                    {step === 'form1' && <PersonalDataStep onNext={handleNext} onSaveContact={handleSaveContact} formData={formData} handleChange={handleChange} />}
                    {step === 'form2' && <VehicleDataStep onQuote={handleQuote} formData={formData} handleChange={handleChange} />}
                    {step === 'comparison' && <ComparisonStep />}
                </main>

                <aside className="hidden lg:block w-1/3 bg-[#6074F3] p-8 sticky top-0 h-screen">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full bg-gray-200 rounded-2xl shadow-2xl overflow-hidden aspect-w-9 aspect-h-16">
                            <img src="./assets/img_form_auto.png" alt="Auto moderno en carretera" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center mt-6 text-3xl font-bold text-white tracking-wider">abc<span className="font-light">seguros</span></p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
