import React, { useState, useEffect } from 'react';

// --- Iconos de React Icons ---
import { GiHealthIncrease } from 'react-icons/gi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

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
const GastosMayoresIcon = () => <GiHealthIncrease className="h-8 w-8 mx-auto mb-2 text-pink-500" />;
const SaludIcon = () => <MdOutlineHealthAndSafety className="h-8 w-8 mx-auto mb-2 text-yellow-500" />;

// --- Datos de ejemplo (solo para la pantalla de comparación) ---
const comparisonData = [
    { logo: "https://placehold.co/150x50/eef2ff/4338ca?text=Sweaden", name: "Seguro Salud Total", price: "$35,50 / mes", details: ["Cobertura Ambulatoria: 80%", "Cobertura Hospitalaria: 100%", "Maternidad: $3000"] },
    { logo: "https://placehold.co/150x50/fffbeb/b45309?text=Hispana+Seguros", name: "Plan Salud Familiar", price: "$45,90 / mes", details: ["Cobertura Ambulatoria: 90%", "Cobertura Hospitalaria: 100%", "Maternidad: $4000"] },
    { logo: "https://placehold.co/150x50/e0f2fe/0891b2?text=Latina+Seguros", name: "Salud Esencial", price: "$29,99 / mes", details: ["Cobertura Ambulatoria: 70%", "Cobertura Hospitalaria: 90%", "Maternidad: $2500"] }
];

// --- Componentes Reutilizables ---
const FormInput = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
    </div>
);
const StepBar = ({ steps, currentStep }) => (
    <div className="flex items-center w-full mb-8">
        {steps.map((step, index) => (
            <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                    <div className={`w-full text-center text-sm font-semibold ${index <= currentStep ? 'text-teal-500' : 'text-gray-400'}`}>
                        {step}
                    </div>
                </div>
                {index < steps.length - 1 && (
                    <div className={`flex-auto border-t-2 transition-colors duration-500 mx-4 ${index < currentStep ? 'border-teal-400' : 'border-gray-200'}`}></div>
                )}
            </React.Fragment>
        ))}
    </div>
);

// --- Componentes de Pasos del Formulario ---
const PersonalDataStep = ({ onNext, formData, handleChange }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulario de Seguro</h2>
        <p className="text-gray-500 mb-6">Datos personales</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Nombres completos" type="text" name="nombres" value={formData.nombres || ''} onChange={handleChange} />
            <FormInput label="Apellidos completos" type="text" name="apellidos" value={formData.apellidos || ''} onChange={handleChange} />
            <FormInput label="Fecha de nacimiento" type="date" name="fechaNacimiento" value={formData.fechaNacimiento || ''} onChange={handleChange} />
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sexo</label>
                <select name="sexo" value={formData.sexo || 'Femenino'} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
                    <option>Femenino</option>
                    <option>Masculino</option>
                </select>
            </div>
            <FormInput label="Teléfono" type="text" name="telefono" value={formData.telefono || ''} onChange={handleChange} />
            <FormInput label="E-mail" type="email" name="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        <p className="text-gray-500 my-6">Dirección de domicilio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Provincia" type="text" name="provincia" value={formData.provincia || ''} onChange={handleChange} />
            <FormInput label="Cantón" type="text" name="canton" value={formData.canton || ''} onChange={handleChange} />
        </div>
        <div className="mt-6 space-y-3">
            <label className="flex items-center">
                <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos || false} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Acepta los <a href="#" className="font-medium text-indigo-600 hover:underline">Términos y condiciones</a></span>
            </label>
        </div>
        <div className="flex justify-end gap-3 mt-8">
            <button className="px-6 py-2 rounded-lg text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition">Guardar contacto</button>
            <button onClick={onNext} className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow">Siguiente</button>
        </div>
    </>
);

const DependentsStep = ({ onQuote, formData, handleChange, handleDependentsChange, addFamilyMember }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Perfil del asegurado y acompañantes</h2>
        <div className="space-y-6 mt-6">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">¿Qué busca en un seguro?</label>
                <select name="tipoBusqueda" value={formData.tipoBusqueda || 'Beneficios'} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
                    <option>Beneficios</option>
                    <option>Respaldo de la aseguradora</option>
                    <option>Precio</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">¿Es una cotización familiar?</label>
                <div className="flex gap-2">
                    <button onClick={() => handleChange({ target: { name: 'esCotizacionFamiliar', value: true, type: 'button' } })} className={`py-2 px-6 rounded-lg border transition ${formData.esCotizacionFamiliar ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>Sí</button>
                    <button onClick={() => handleChange({ target: { name: 'esCotizacionFamiliar', value: false, type: 'button' } })} className={`py-2 px-6 rounded-lg border transition ${!formData.esCotizacionFamiliar ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>No</button>
                </div>
            </div>
            {formData.esCotizacionFamiliar && (
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Información Familiar</label>
                    {(formData.dependientes || []).map((member, index) => (
                        <div key={member.id} className="flex items-center gap-2 mb-2">
                            <FormInput placeholder="Género" name="genero" value={member.genero} onChange={(e) => handleDependentsChange(index, e)} />
                            <FormInput placeholder="Relación" name="relacion" value={member.relacion} onChange={(e) => handleDependentsChange(index, e)} />
                            <FormInput placeholder="Edad" type="number" name="edad" value={member.edad} onChange={(e) => handleDependentsChange(index, e)} />
                            {index === formData.dependientes.length - 1 && <PlusCircleIcon onClick={addFamilyMember} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="flex justify-end mt-8">
            <button onClick={onQuote} className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg">Cotizar</button>
        </div>
    </>
);

const ComparisonStep = () => (
    <div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Planes de Salud Disponibles</h1>
        <p className="text-gray-500 mt-1 mb-8">Selecciona la mejor opción de seguro de Salud para ti.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisonData.map((plan, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex-grow">
                        <div className="flex justify-center mb-4"><img src={plan.logo} alt={`Logo de ${plan.name}`} className="h-12" /></div>
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

const InsuranceTypeCard = ({ icon, label, selected, onClick }) => (
    <div onClick={onClick} className={`relative text-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${selected ? 'bg-white border-teal-400 shadow-lg scale-105' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'}`}>
        {selected && <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-teal-400" />}
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
);


// --- Componente Principal del Formulario ---
export default function Form_Salud({ navigateTo, cotizacionIdParaEditar = null }) {
    const [step, setStep] = useState('form1');
    const [cotizacionId, setCotizacionId] = useState(cotizacionIdParaEditar);
    const [cargando, setCargando] = useState(!!cotizacionIdParaEditar);
    
    const [formData, setFormData] = useState({
        tipoSeguroPrincipal: 'Salud',
        tipoSeguroSalud: 'salud',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        sexo: 'Femenino',
        telefono: '',
        email: '',
        provincia: '',
        canton: '',
        aceptaTerminos: false,
        aceptaPromociones: false,
        tipoBusqueda: 'Beneficios',
        esCotizacionFamiliar: false,
        dependientes: []
    });

    const stepLabels = ['Personal', 'Dependientes', 'Planes'];
    const stepMap = { form1: 0, form2: 1, comparison: 2 };
    const currentStepIndex = stepMap[step];

    useEffect(() => {
        const cargarDatosParaEditar = async (id) => {
            console.log(`Cargando datos para editar la cotización ID: ${id}`);
            setCargando(true);
            try {
                const respuesta = await fetch(`http://localhost:5000/api/cotizaciones/${id}`);
                if (!respuesta.ok) throw new Error("No se encontró la cotización para editar");
                
                const datosExistentes = await respuesta.json();
                setFormData(prevState => ({ ...prevState, ...datosExistentes }));
            } catch (error) {
                console.error("Error al cargar datos para editar:", error);
                alert("No se pudo cargar la cotización para editar.");
                navigateTo('landing');
            } finally {
                setCargando(false);
            }
        };

        if (cotizacionIdParaEditar) {
            cargarDatosParaEditar(cotizacionIdParaEditar);
        }
    }, [cotizacionIdParaEditar, navigateTo]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDependentsChange = (index, event) => {
        const nuevosDependientes = formData.dependientes ? [...formData.dependientes] : [];
        nuevosDependientes[index][event.target.name] = event.target.value;
        setFormData(prevState => ({ ...prevState, dependientes: nuevosDependientes }));
    };
    
    const addFamilyMember = () => {
        const nuevosDependientes = formData.dependientes ? [...formData.dependientes] : [];
        setFormData(prevState => ({
            ...prevState,
            dependientes: [...nuevosDependientes, { id: Date.now(), genero: '', relacion: '', edad: '' }]
        }));
    };

    const guardarProgreso = async () => {
        const esActualizacion = !!cotizacionId;
        const url = esActualizacion
            ? `http://localhost:5000/api/cotizaciones/${cotizacionId}`
            : 'http://localhost:5000/api/cotizaciones';
        const method = esActualizacion ? 'PUT' : 'POST';

        console.log(`Guardando progreso (${method}) para:`, formData);
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
                console.log("Cotización nueva creada con ID:", resultado.id_cotizacion);
            } else {
                console.log("Cotización actualizada con éxito.");
            }
        } catch (error) {
            console.error("Error al guardar progreso:", error);
            alert("Hubo un problema al guardar tu progreso.");
        }
    };
    
    const handleNext = async () => {
        await guardarProgreso();
        setStep('form2');
    };
    
    const handleQuote = async () => {
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
        <div className="bg-white font-sans w-full h-full flex flex-col min-h-screen">
            <div className="flex flex-col lg:flex-row flex-grow">
                <main className="w-full lg:w-2/3 bg-slate-50 p-6 sm:p-8 md:p-12 overflow-y-auto">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-8 transition">
                        <BackArrowIcon /> Volver
                    </button>

                    {step !== 'comparison' && (
                        <StepBar steps={stepLabels} currentStep={currentStepIndex} />
                    )}

                    {step !== 'comparison' && (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Salud</h1>
                            <p className="text-gray-500 mt-2 mb-6">Seleccione el tipo de seguro de Salud</p>
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <InsuranceTypeCard icon={<GastosMayoresIcon />} label="Gastos Mayores" selected={formData.tipoSeguroSalud === 'gastosMayores'} onClick={() => handleChange({ target: { name: 'tipoSeguroSalud', value: 'gastosMayores', type: 'button' }})} />
                                <InsuranceTypeCard icon={<SaludIcon />} label="Salud" selected={formData.tipoSeguroSalud === 'salud'} onClick={() => handleChange({ target: { name: 'tipoSeguroSalud', value: 'salud', type: 'button' }})} />
                            </div>
                        </>
                    )}

                    {step === 'form1' && <PersonalDataStep onNext={handleNext} formData={formData} handleChange={handleChange} />}
                    {step === 'form2' && <DependentsStep onQuote={handleQuote} formData={formData} handleChange={handleChange} handleDependentsChange={handleDependentsChange} addFamilyMember={addFamilyMember} />}
                    {step === 'comparison' && <ComparisonStep />}
                </main>

                <aside className="hidden lg:block w-1/3 bg-[#6074F3] p-8 sticky top-0 h-screen">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full bg-gray-300 rounded-2xl shadow-2xl overflow-hidden aspect-w-9 aspect-h-16">
                            <img src="/src/assets/img_form_salud.png" alt="Doctora sonriendo a un paciente" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center mt-6 text-3xl font-bold text-white tracking-wider">abc<span className="font-light">seguros</span></p>
                    </div>
                </aside>
            </div>
        </div>
    );
}