import React, { useState } from 'react';

// Importamos los componentes que actuarán como nuestras "páginas"
import Landing from './Landing.jsx';
import Form_Vida from './Cotization_Forms/Form_Vida.jsx';
import Form_Salud from './Cotization_Forms/Form_Salud.jsx';
import Contactos from './Pages/Contactos.jsx';

// --- Iconos para la Barra Lateral ---
// Se ha añadido un icono para "Inicio" y se ajustó el tamaño.

const HomeIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const UserPlusIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const UsersIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const StarIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);


const sidebarLinks = [
    { id: 'inicio', text: 'Inicio', icon: <HomeIcon />, view: 'landing' },
    { id: 'posibles', text: 'Posibles Clientes', icon: <UserPlusIcon />, view: 'posibles-clientes' },
    { id: 'contactos', text: 'Contactos', icon: <UsersIcon />, view: 'contactos' },
    { id: 'oportunidades', text: 'Oportunidades', icon: <StarIcon />, view: 'oportunidades' },
];

// --- Barra Lateral para Escritorio ---
const DesktopSidebar = ({ navigateTo, currentView }) => {
    return (
        <nav className="group fixed top-0 left-0 h-screen w-20 hover:w-64 bg-[#6074F3] z-20 hidden sm:flex flex-col transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-center mt-8 space-y-4 w-full">
                {sidebarLinks.map((link) => (
                    <a
                        href="#"
                        key={link.id}
                        onClick={(e) => { e.preventDefault(); navigateTo(link.view); }}
                        className={`flex items-center w-full pl-6 h-16 transition-colors duration-200 ${currentView === link.view ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    >
                        <div className="bg-white p-2.5 rounded-xl shadow-md">
                            <div className="text-[#6074F3]">{link.icon}</div>
                        </div>
                        <span className="ml-5 text-base font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {link.text}
                        </span>
                    </a>
                ))}
            </div>
        </nav>
    );
};

// --- Barra Superior para Móviles ---
const MobileTopBar = ({ navigateTo, currentView }) => {
    return (
        <nav className="sm:hidden fixed top-0 w-full bg-[#6074F3] z-20 flex justify-around items-center p-2 shadow-lg">
            {sidebarLinks.map((link) => (
                <a
                    href="#"
                    key={link.id}
                    onClick={(e) => { e.preventDefault(); navigateTo(link.view); }}
                    className={`p-1 rounded-xl transition-colors duration-200 ${currentView === link.view ? 'bg-white/20' : ''}`}
                >
                    <div className="bg-white p-2 rounded-lg shadow-md">
                        <div className="text-[#6074F3]">
                            {/* Hacemos los iconos un poco más pequeños para la barra móvil */}
                            {React.cloneElement(link.icon, { className: "h-6 w-6" })}
                        </div>
                    </div>
                </a>
            ))}
        </nav>
    );
};


// --- Componente Principal de la Aplicación ---
export default function App() {
    const [currentView, setCurrentView] = useState('landing');

    const navigateTo = (view) => {
        setCurrentView(view);
    };

    const renderView = () => {
        switch (currentView) {
            case 'landing':
                return <Landing navigateTo={navigateTo} />;
            case 'form-vida':
                return <Form_Vida navigateTo={navigateTo} />;
            case 'form-salud':
                return <Form_Salud navigateTo={navigateTo} />;
            case 'contactos':
                return <Contactos navigateTo={navigateTo} />;
            case 'oportunidades':
                return <div className="p-8 text-center"><h1>Vista de Oportunidades</h1><p>Contenido futuro.</p></div>;
            default:
                return <Landing navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-gray-50 flex min-h-screen font-sans">
            {/* Se renderizan ambas barras de navegación, pero se muestran condicionalmente con CSS */}
            <DesktopSidebar navigateTo={navigateTo} currentView={currentView} />
            <MobileTopBar navigateTo={navigateTo} currentView={currentView} />
            
            {/* El contenido principal se ajusta para no ser tapado por las barras de navegación */}
            <main className="flex-grow w-full sm:ml-20 pt-24 sm:pt-0">
                {renderView()}
            </main>
        </div>
    );
}
