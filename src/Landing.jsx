import React, { useState, useEffect } from 'react';
import { FaCarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { RiStethoscopeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

// --- Iconos ---
const HandHeartIcon = () => <FaHandHoldingHeart className="h-12 w-12 text-yellow-400"/>;
const StethoscopeIcon = () => <RiStethoscopeFill className="h-12 w-12 text-blue-500"/>;
const CarIcon = () => <FaCarAlt className="h-12 w-12 text-gray-800"/>;
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

// --- Sub-componente para la Tarjeta de Cotización ---
const QuoteCard = ({ quote, navigateTo }) => {
    // Determina a qué vista navegar basado en el tipo de seguro
    const getFormView = (type) => {
        const view = type.toLowerCase();
        if (view === 'vida' || view === 'salud' || view === 'auto') {
            return `form-${view}`;
        }
        return 'landing'; // Vista por defecto si el tipo no coincide
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-3 rounded-2xl flex-shrink-0"><UserIcon /></div>
            <div className="flex-grow text-center sm:text-left">
              <h3 className="font-bold text-gray-800">Seguro de {quote.type} - {quote.name}</h3>
              <p className="text-sm text-gray-500">{quote.location} • {quote.status} • {quote.details}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(quote.time).toLocaleString('es-EC', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                })}
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="w-full flex-grow sm:w-32">
                    <div className="flex justify-between mb-1"><span className="text-sm font-medium text-indigo-700">{quote.progress}%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${quote.progress}%` }}></div></div>
                </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo(getFormView(quote.type), quote.id)}
                className="flex items-center gap-2 text-sm text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Editar <EditIcon />
              </motion.button>
            </div>
        </motion.div>
    );
};


// --- Componente Principal del Landing ---
export default function Landing({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('incompletas');
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const insuranceTypes = [
    { id: 'vida', name: 'Vida', icon: <HandHeartIcon />, view: 'form-vida' },
    { id: 'salud', name: 'Salud', icon: <StethoscopeIcon />, view: 'form-salud' },
    { id: 'auto', name: 'Auto', icon: <CarIcon />, view: 'form-auto' },
  ];

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/api/cotizaciones');
        if (!respuesta.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        const data = await respuesta.json();
        setCotizaciones(data);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchCotizaciones();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const cotizacionesIncompletas = cotizaciones.filter(quote => quote.progress < 100);
  const cotizacionesCompletas = cotizaciones.filter(quote => quote.progress === 100);

  return (
    <div className="p-4 md:p-8 w-full h-full">
      {/* --- Sección Hero --- */}
      <section className="bg-[#6074F3] text-white p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold">Inicia tu cotización</h1>
          <p className="text-indigo-100 text-lg mt-1">Escoge el tipo de cotización</p>
        </div>
        <div className="flex items-end justify-center space-x-4 md:space-x-8">
          {insuranceTypes.map((type) => (
            <motion.div 
                key={type.id} 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center cursor-pointer" 
                onClick={() => navigateTo(type.view)}
            >
              <p className="font-bold text-lg mb-2">{type.name}</p>
              <div className="bg-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shadow-md">{type.icon}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Pestañas de Filtro --- */}
      <div className="flex justify-center my-8">
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-full">
            <button
                onClick={() => setActiveTab('incompletas')}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'incompletas' ? 'bg-[#6074F3] text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            >
                Cotizaciones incompletas
            </button>
            <button
                onClick={() => setActiveTab('completas')}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'completas' ? 'bg-[#6074F3] text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
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
          {cargando ? (
            <p className="text-center text-gray-500 py-8">Cargando cotizaciones...</p>
          ) : activeTab === 'incompletas' ? (
            cotizacionesIncompletas.length > 0 ? (
              cotizacionesIncompletas.map((quote) => <QuoteCard key={quote.id} quote={quote} navigateTo={navigateTo} />)
            ) : (
              <p className="text-center text-gray-500 py-8">No hay cotizaciones por terminar.</p>
            )
          ) : (
            cotizacionesCompletas.length > 0 ? (
                cotizacionesCompletas.map((quote) => <QuoteCard key={quote.id} quote={quote} navigateTo={navigateTo} />)
            ) : (
                <p className="text-center text-gray-500 py-8">No hay cotizaciones completadas.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
