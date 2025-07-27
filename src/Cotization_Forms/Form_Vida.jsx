import React, { useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import { FaUserDoctor } from 'react-icons/fa6';
import { TbRibbonHealth } from 'react-icons/tb';

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

// CORRECCIÓN: Se actualiza el componente para aceptar la función onClick
const PlusCircleIcon = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Componentes para los iconos de tipo de seguro ---
const CancerIcon = () => (
    <TbRibbonHealth className="h-8 w-8 mx-auto mb-2 text-pink-500" />
);

const LifeIcon = () => (
    <FaUserDoctor className="h-8 w-8 mx-auto mb-2 text-blue-500" />
);

const AccidentIcon = () => (
    <CgDanger className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
);


// --- Datos de ejemplo para la pantalla de comparación ---
const comparisonData = [
    { logo: "https://placehold.co/150x50/e0e7ff/3730a3?text=Sweaden", name: "Seguro Vida Colectiva", price: "$14,90 / mes", details: ["Monto de cobertura: $250000", "Terapia Psicológica: 3 Sesiones", "Sueldo Mensual por 1 año: $700"]},
    { logo: "https://placehold.co/150x50/fffbeb/b45309?text=Hispana+Seguros", name: "Seguro Vida Oncologico", price: "$19,90 / mes", details: ["Monto de cobertura: $300000", "Terapia Psicológica: 4 Sesiones", "Sueldo Mensual por 1 año: $800"]},
    { logo: "https://placehold.co/150x50/e0f2fe/0891b2?text=Latina+Seguros", name: "Seguro Cáncer Care", price: "$24,90 / mes", details: ["Monto de cobertura: $400000", "Terapia Psicológica: 5 Sesiones", "Sueldo Mensual por 1 año: $1000"]}
];

// --- Componentes Reutilizables ---
const FormInput = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input {...props} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
    </div>
);

const InsuranceTypeCard = ({ icon, label, selected, onClick }) => (
    <div onClick={onClick} className={`relative text-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${ selected ? 'bg-white border-teal-400 shadow-lg scale-105' : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'}`}>
        {selected && <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-teal-400" />}
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
);

// --- Componente de Barra de Pasos con Etiquetas (Estilo de Texto) ---
const StepBar = ({ steps, currentStep }) => {
    return (
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
};


// --- Componentes de Pasos del Formulario ---
const PersonalDataStep = ({ onNext }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulario de Seguro</h2>
        <p className="text-gray-500 mb-6">Datos personales</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Nombres completos" type="text" defaultValue="Maria Luisa" />
            <FormInput label="Apellidos completos" type="text" defaultValue="Alvarez Piedra" />
            <FormInput label="Fecha de nacimiento" type="date" defaultValue="2000-05-06" />
            <FormInput label="Sexo" type="text" defaultValue="Femenino" />
            <FormInput label="Teléfono" type="text" defaultValue="(593) 9987654321" />
            <FormInput label="E-mail" type="email" defaultValue="maria_alvarez@gmail.com" />
        </div>
        <p className="text-gray-500 my-6">Dirección de domicilio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Provincia" type="text" defaultValue="Loja" />
            <FormInput label="Cantón" type="text" defaultValue="Loja" />
        </div>
        <div className="mt-6 space-y-3">
            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><span className="ml-2 text-sm text-gray-600">Acepta los <a href="#" className="font-medium text-indigo-600 hover:underline">Términos y condiciones</a></span></label>
            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><span className="ml-2 text-sm text-gray-600">Enviar avisos y promociones al correo</span></label>
        </div>
        <div className="flex justify-end gap-3 mt-8">
            <button className="px-6 py-2 rounded-lg text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition">Guardar contacto</button>
            <button onClick={onNext} className="px-6 py-2 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition shadow">Siguiente</button>
        </div>
    </>
);

const ProfileStep = ({ onQuote }) => {
    const [isFamily, setIsFamily] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([{ id: 1 }]);
    const addFamilyMember = () => setFamilyMembers([...familyMembers, { id: Date.now() }]);
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Perfil del asegurado y acompañantes</h2>
            <div className="space-y-6 mt-6">
                <div><label className="block text-sm font-medium text-gray-600 mb-1">Ocupación</label><select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"><option>Elija la profesion del asegurado</option><option>Ingeniero/a</option></select></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-2">¿Qué busca en un seguro?</label><div className="flex gap-2"><button className="flex-1 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Beneficios</button><button className="flex-1 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Respaldo</button><button className="flex-1 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Precio</button></div></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-2">¿Es una cotización familiar?</label><div className="flex gap-2"><button onClick={() => setIsFamily(true)} className={`py-2 px-6 rounded-lg border transition ${isFamily ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>Sí</button><button onClick={() => setIsFamily(false)} className={`py-2 px-6 rounded-lg border transition ${!isFamily ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>No</button></div></div>
                {isFamily && (<div><label className="block text-sm font-medium text-gray-600 mb-2">Informacion Familiar</label>{familyMembers.map((member, index) => (<div key={member.id} className="flex items-center gap-2 mb-2"><FormInput placeholder="Genero" /><FormInput placeholder="Relacion" /><FormInput placeholder="Edad" />
                {/* CORRECCIÓN: Se pasa la función addFamilyMember al componente del icono */}
                {index === familyMembers.length - 1 && <PlusCircleIcon onClick={addFamilyMember} />}
                </div>))}</div>)}
            </div>
            <div className="flex justify-end mt-8"><button onClick={onQuote} className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg">Cotizar</button></div>
        </>
    );
};

const ComparisonStep = () => (
    <div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Vida</h1>
        <p className="text-gray-500 mt-1 mb-8">Seleccione la mejor opcion de seguro de Vida</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisonData.map((plan, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex-grow"><div className="flex justify-center mb-4"><img src={plan.logo} alt={`Logo de ${plan.name}`} className="h-12"/></div><h3 className="text-xl font-bold text-center text-gray-800">{plan.name}</h3><p className="text-lg font-semibold text-center text-gray-600 my-2">{plan.price}</p><ul className="text-sm text-gray-500 space-y-2 mt-4 list-disc list-inside">{plan.details.map((detail, i) => <li key={i}>{detail}</li>)}</ul></div>
                    <div className="mt-6 text-center text-xs space-x-2"><a href="#" className="text-indigo-600 hover:underline">Descargar plan</a><span>•</span><a href="#" className="text-indigo-600 hover:underline">Compartir plan</a></div>
                    <button className="w-full mt-4 py-3 rounded-lg bg-teal-400 text-white font-bold hover:bg-teal-500 transition shadow">Seleccionar este plan</button>
                </div>
            ))}
        </div>
    </div>
);

// --- Componente Principal del Formulario ---
export default function Form_Vida({ navigateTo }) {
    const [step, setStep] = useState('form1');
    const [selectedInsurance, setSelectedInsurance] = useState('oncologico');
    
    // Se definen las etiquetas y el mapa de pasos para la nueva barra de progreso
    const stepLabels = ['Personal', 'Dependientes', 'Planes'];
    const stepMap = { form1: 0, form2: 1, comparison: 2 };
    const currentStepIndex = stepMap[step];

    const handleNext = () => setStep('form2');
    const handleQuote = () => setStep('comparison');

    const handleBack = () => {
        if (step === 'comparison') setStep('form2');
        else if (step === 'form2') setStep('form1');
        else if (step === 'form1') navigateTo('landing'); 
    };
    
    return (
        <div className="bg-white font-sans w-full h-full flex flex-col">
            <div className="flex flex-col lg:flex-row flex-grow">
                {/* Contenido principal que se puede desplazar */}
                <main className="w-full lg:w-2/3 bg-slate-50 p-6 sm:p-8 md:p-12 overflow-y-auto">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-8 transition">
                        <BackArrowIcon /> Volver
                    </button>
                    
                    {step !== 'comparison' && (
                         <>
                            {/* Se reemplaza la barra de progreso anterior por el nuevo componente StepBar */}
                            <StepBar steps={stepLabels} currentStep={currentStepIndex} />
                            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Cotizador de Vida</h1>
                            <p className="text-gray-500 mt-2 mb-6">Seleccione el tipo de seguro de Vida</p>
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <InsuranceTypeCard icon={<CancerIcon/>} label="Oncológico" selected={selectedInsurance === 'oncologico'} onClick={() => setSelectedInsurance('oncologico')} />
                                <InsuranceTypeCard icon={<LifeIcon/>} label="Vida" selected={selectedInsurance === 'vida'} onClick={() => setSelectedInsurance('vida')} />
                                <InsuranceTypeCard icon={<AccidentIcon/>} label="Accidentes" selected={selectedInsurance === 'accidentes'} onClick={() => setSelectedInsurance('accidentes')} />
                            </div>
                         </>
                    )}

                    {step === 'form1' && <PersonalDataStep onNext={handleNext} />}
                    {step === 'form2' && <ProfileStep onQuote={handleQuote} />}
                    {step === 'comparison' && <ComparisonStep />}
                </main>

                {/* Panel lateral con la imagen (fijo en pantallas grandes) */}
                <aside className="hidden lg:block w-1/3 bg-[#6074F3] p-8 sticky top-0 h-screen">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full bg-gray-200 rounded-2xl shadow-2xl overflow-hidden aspect-w-9 aspect-h-16">
                            <img src="./assets/img_form_vida.png" alt="Manos unidas sobre una mesa" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center mt-6 text-3xl font-bold text-white tracking-wider">abc<span className="font-light">seguros</span></p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
