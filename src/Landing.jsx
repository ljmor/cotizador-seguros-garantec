import React, { useState } from 'react';
import { FaCarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { RiStethoscopeFill } from 'react-icons/ri';

// --- Iconos SVG para el Landing Page ---
// Para mantener el componente autocontenido, definimos los iconos aquí.
// En un proyecto más grande, considera moverlos a un archivo común como /components/Icons.jsx

const HandHeartIcon = () => (
    <FaHandHoldingHeart className="h-12 w-12 text-yellow-400"/>
);

const StethoscopeIcon = () => (
    <RiStethoscopeFill className="h-12 w-12 text-blue-500"/>
);

const CarIcon = () => (
    <FaCarAlt className="h-12 w-12 text-gray-800"/>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


// --- Datos de Ejemplo ---
const quotesData = [
    { id: 1, type: 'Vida', name: 'Carlos R.', location: 'Quito', status: 'Cotización pendiente', details: 'Aguardando confirmación', progress: 75, time: 'Hoy, 10:32 a.m.'},
    { id: 2, type: 'Salud', name: 'Laura D.', location: 'Ambato', status: 'Cotización incompleta', details: 'Falta de datos: beneficiarios', progress: 50, time: 'Hace 2 horas'},
    { id: 3, type: 'Auto', name: 'Mario V.', location: 'Loja', status: 'Cotización incompleta', details: 'Falta de datos: contacto y beneficiarios', progress: 25, time: 'Hace 3 días'},
];


// --- Sub-componente para la Tarjeta de Cotización ---
const QuoteCard = ({ quote }) => (
  <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-gray-100 p-3 rounded-2xl flex-shrink-0">
      <UserIcon />
    </div>
    <div className="flex-grow text-center sm:text-left">
      <h3 className="font-bold text-gray-800">Seguro de {quote.type} - {quote.name}</h3>
      <p className="text-sm text-gray-500">
        {quote.location} • {quote.status} • {quote.details}
      </p>
      <p className="text-xs text-gray-400 mt-1">{quote.time}</p>
    </div>
    <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
       <div className="w-full flex-grow sm:w-32">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-indigo-700">{quote.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${quote.progress}%` }}></div>
            </div>
        </div>
      <button className="flex items-center gap-2 text-sm text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
        Editar
        <EditIcon />
      </button>
    </div>
  </div>
);


// --- Componente Principal del Landing ---
// Recibe `navigateTo` como prop desde App.jsx para poder cambiar de vista.
export default function Landing({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('incompletas');

  // Define los tipos de seguro y la vista a la que cada uno debe navegar.
  const insuranceTypes = [
    { id: 'vida', name: 'Vida', icon: <HandHeartIcon />, view: 'form-vida' },
    { id: 'salud', name: 'Salud', icon: <StethoscopeIcon />, view: 'form-salud' }, 
    { id: 'auto', name: 'Auto', icon: <CarIcon />, view: 'form-auto' },         // Vista futura
  ];

  return (
    // El contenedor principal ocupa todo el espacio disponible y añade padding.
    <div className="p-4 md:p-8 w-full h-full">
      {/* --- Sección Hero --- */}
      <section className="bg-[#6074F3] text-white p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold">Inicia tu cotización</h1>
          <p className="text-indigo-100 text-lg mt-1">Escoge el tipo de cotización</p>
        </div>
        
        <div className="flex items-end justify-center space-x-4 md:space-x-8">
          {insuranceTypes.map((type) => (
            // Al hacer clic en una tarjeta, se llama a la función `navigateTo` con el nombre de la vista.
            <div 
              key={type.id} 
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() => navigateTo(type.view)}
            >
              <p className="font-bold text-lg mb-2">{type.name}</p>
              <div className="bg-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shadow-md">
                {type.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Pestañas de Filtro --- */}
      <div className="flex justify-center my-8">
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('incompletas')}
            className={`flex items-center justify-center px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
              activeTab === 'incompletas'
                ? 'bg-[#6074F3] text-white shadow'
                : 'text-gray-600 hover:bg-gray-300'
            }`}
          >
            Cotizaciones incompletas
          </button>
          <button
            onClick={() => setActiveTab('completas')}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
              activeTab === 'completas'
                ? 'bg-[#6074F3] text-white shadow'
                : 'text-gray-600 hover:bg-gray-300'
            }`}
          >
            Cotizaciones Completas
          </button>
        </div>
      </div>

      {/* --- Lista de Cotizaciones --- */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {activeTab === 'incompletas' ? 'Cotizaciones por terminar' : 'Cotizaciones Completadas'}
        </h2>
        <div className="space-y-4">
          {activeTab === 'incompletas' ? (
            quotesData.map((quote) => <QuoteCard key={quote.id} quote={quote} />)
          ) : (
            <p className="text-center text-gray-500 py-8">No hay cotizaciones completadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
