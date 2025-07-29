import React, { useState, useEffect } from 'react';
import { FaCarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { RiStethoscopeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

// --- Iconos para el Banner ---
const HandHeartIcon = () => <FaHandHoldingHeart className="h-12 w-12 text-yellow-400"/>;
const StethoscopeIcon = () => <RiStethoscopeFill className="h-12 w-12 text-blue-500"/>;
const CarIcon = () => <FaCarAlt className="h-12 w-12 text-gray-800"/>;

// --- Icono de Editar ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
  </svg>
);

// --- FUNCIÓN DE TIEMPO ACTUALIZADA ---
const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);

    // Opciones para formatear la hora
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    // Opciones para formatear la fecha
    const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    // Comprobar si es hoy
    const isToday = now.toDateString() === past.toDateString();
    if (isToday) {
        const seconds = Math.floor((now - past) / 1000);
        const hours = Math.floor(seconds / 3600);
        if (hours > 0) {
            return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes > 0) {
            return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        }
        return "hace unos segundos";
    }

    // Comprobar si fue ayer
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.toDateString() === past.toDateString();
    if (isYesterday) {
        return `Ayer, ${past.toLocaleTimeString('es-EC', timeOptions)}`;
    }

    // Si es más antiguo, mostrar la fecha completa
    return past.toLocaleDateString('es-EC', dateOptions);
};


// --- Componente de Avatar con los iconos de Flaticon ---
const QuoteUserIcon = ({ sexo }) => {
    // URLs directas de los iconos que elegiste
    const avatarFemeninoUrl = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"; // Icono de Justicon
    const avatarMasculinoUrl = "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"; // Icono de Freepik
    const avatarDefaultUrl = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"; // Un icono neutral

    let avatarSrc = avatarDefaultUrl;

    if (sexo === 'Femenino') {
        avatarSrc = avatarFemeninoUrl;
    } else if (sexo === 'Masculino') {
        avatarSrc = avatarMasculinoUrl;
    }

    return (
        <img 
            src={avatarSrc} 
            alt="Avatar de usuario" 
            className="h-20 w-20 object-contain" // object-contain para asegurar que se vea completo
        />
    );
};


// --- Sub-componente para la Tarjeta de Cotización ---
const QuoteCard = ({ quote, navigateTo }) => {
    const getFormView = (type) => {
        const view = type.toLowerCase();
        return (view === 'vida' || view === 'salud' || view === 'auto') ? `form-${view}` : 'landing';
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
            
            <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-2xl flex-shrink-0">
                    <QuoteUserIcon sexo={quote.sexo} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-2xl text-gray-800">Seguro de {quote.type} - {quote.name}</h4>
                  <p className="text-base text-gray-600">{quote.location} • {quote.status} • {quote.details}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {formatTimeAgo(quote.time)}
                  </p>
                </div>
            </div>

            <div className="flex items-center gap-5 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="w-full flex-grow sm:w-36">
                    <div className="flex justify-end mb-1"><span className="text-sm font-medium text-indigo-700">{quote.progress}%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${quote.progress}%` }}></div></div>
                </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo(getFormView(quote.type), quote.id)}
                className="flex items-center gap-2 text-base text-indigo-600 font-semibold py-2 px-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
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

  // --- NUEVO: Variantes para las animaciones del banner ---
  const bannerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Aplica un retraso de 0.2s entre cada hijo
      },
    },
  };

  const bannerItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };


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

  const cotizacionesIncompletas = cotizaciones.filter(quote => quote.progress < 100);
  const cotizacionesCompletas = cotizaciones.filter(quote => quote.progress === 100);

  return (
    <div className="p-4 md:p-8 w-full h-full">
      <section className="bg-[#6074F3] text-white p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        <motion.div 
            className="text-center lg:text-left mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-6xl font-bold">Inicia tu cotización</h2>
          <p className="text-indigo-100 text-lg mt-1">Escoge el tipo de cotización</p>
        </motion.div>
        
        {/* --- MODIFICADO: Contenedor de iconos con animación escalonada --- */}
        <motion.div 
            className="flex items-end justify-center space-x-4 md:space-x-8"
            variants={bannerContainerVariants}
            initial="hidden"
            animate="visible"
        >
          {insuranceTypes.map((type) => (
            <motion.div 
                key={type.id} 
                variants={bannerItemVariants} // Aplica la animación a cada item
                whileHover={{ y: -10, scale: 1.05 }} // Efecto mejorado al pasar el mouse
                whileTap={{ scale: 0.95 }} // Efecto de pulso al hacer clic
                className="flex flex-col items-center text-center cursor-pointer" 
                onClick={() => navigateTo(type.view)}
            >
              <p className="font-bold text-lg mb-2">{type.name}</p>
              <div className="bg-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shadow-md">{type.icon}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="flex justify-center my-8">
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-full">
            <button
                onClick={() => setActiveTab('incompletas')}
                className={`px-6 py-2 text-l font-semibold rounded-full transition-colors ${activeTab === 'incompletas' ? 'bg-[#6074F3] text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            >
                Cotizaciones incompletas
            </button>
            <button
                onClick={() => setActiveTab('completas')}
                className={`px-6 py-2 text-l font-semibold rounded-full transition-colors ${activeTab === 'completas' ? 'bg-[#6074F3] text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            >
                Cotizaciones Completas
            </button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
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
