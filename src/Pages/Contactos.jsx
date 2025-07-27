import React, { useState } from 'react';
import { FiUsers, FiUserCheck, FiMonitor, FiChevronDown, FiSearch, FiMail, FiPhone, FiMapPin, FiShield } from 'react-icons/fi';
import { FaCarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { RiStethoscopeFill } from 'react-icons/ri';

// --- Icono de Flecha para Volver ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- Iconos para tipos de seguro ---
const VidaIcon = () => <FaHandHoldingHeart className="h-4 w-4 text-yellow-500" />;
const SaludIcon = () => <RiStethoscopeFill className="h-4 w-4 text-blue-500" />;
const AutoIcon = () => <FaCarAlt className="h-4 w-4 text-green-500" />;

// --- Datos de ejemplo para la tabla de contactos ---
const initialContactsData = [
    { 
        id: 1, 
        nombre: 'María José Álvarez', 
        tipoSeguro: 'Vida', 
        email: 'maria.alvarez@gmail.com', 
        telefono: '(593) 987-654-321', 
        provincia: 'Loja', 
        canton: 'Loja', 
        fechaRegistro: '2025-07-20'
    },
    { 
        id: 2, 
        nombre: 'Carlos Eduardo Morales', 
        tipoSeguro: 'Auto', 
        email: 'carlos.morales@hotmail.com', 
        telefono: '(593) 998-123-456', 
        provincia: 'Pichincha', 
        canton: 'Quito', 
        fechaRegistro: '2025-07-18'
    },
    { 
        id: 3, 
        nombre: 'Ana Patricia González', 
        tipoSeguro: 'Salud', 
        email: 'ana.gonzalez@empresa.com', 
        telefono: '(593) 987-321-654', 
        provincia: 'Guayas', 
        canton: 'Guayaquil', 
        fechaRegistro: '2025-07-15'
    },
    { 
        id: 4, 
        nombre: 'Roberto Silva Mendoza', 
        tipoSeguro: 'Vida', 
        email: '', 
        telefono: '(593) 999-888-777', 
        provincia: 'Azuay', 
        canton: 'Cuenca', 
        fechaRegistro: '2025-07-12'
    },
    { 
        id: 5, 
        nombre: 'Laura Vásquez Torres', 
        tipoSeguro: 'Auto', 
        email: 'laura.vasquez@gmail.com', 
        telefono: '(593) 987-555-666', 
        provincia: 'Loja', 
        canton: 'Catamayo', 
        fechaRegistro: '2025-07-10'
    },
    { 
        id: 6, 
        nombre: 'Diego Fernando Castro', 
        tipoSeguro: 'Salud', 
        email: 'diego.castro@yahoo.com', 
        telefono: '', 
        provincia: 'Manabí', 
        canton: 'Manta', 
        fechaRegistro: '2025-07-08'
    },
    { 
        id: 7, 
        nombre: 'Patricia Ramírez López', 
        tipoSeguro: 'Vida', 
        email: 'patricia.ramirez@outlook.com', 
        telefono: '(593) 998-444-555', 
        provincia: 'Loja', 
        canton: 'Loja', 
        fechaRegistro: '2025-07-05'
    },
    { 
        id: 8, 
        nombre: 'Fernando Jiménez Mora', 
        tipoSeguro: 'Auto', 
        email: 'fernando.jimenez@empresa.ec', 
        telefono: '(593) 987-777-888', 
        provincia: 'Tungurahua', 
        canton: 'Ambato', 
        fechaRegistro: '2025-07-02'
    },
];

// --- Componente de Tarjeta de Estadísticas ---
const StatCard = ({ icon, title, value, detail, detailColor }) => (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-5 transform transition-all duration-200 hover:scale-105">
        <div className="bg-teal-100 text-teal-500 p-4 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {detail && <p className={`text-xs font-medium ${detailColor || 'text-gray-500'}`}>{detail}</p>}
        </div>
    </div>
);

// --- Componente de Etiqueta de Estado ---
// Componente eliminado ya que no se usa la columna de estado

// --- Componente de Icono de Tipo de Seguro ---
const InsuranceTypeIcon = ({ type }) => {
    switch (type) {
        case 'Vida':
            return <VidaIcon />;
        case 'Salud':
            return <SaludIcon />;
        case 'Auto':
            return <AutoIcon />;
        default:
            return <FiShield className="h-4 w-4 text-gray-500" />;
    }
};

// --- Componente de Dropdown para Agregar Contacto ---
const AddContactDropdown = ({ isOpen, onClose, navigateTo }) => {
    const insuranceOptions = [
        { id: 'vida', name: 'Seguro de Vida', icon: <VidaIcon />, view: 'form-vida' },
        { id: 'salud', name: 'Seguro de Salud', icon: <SaludIcon />, view: 'form-salud' },
        { id: 'auto', name: 'Seguro de Auto', icon: <AutoIcon />, view: 'form-auto' },
    ];

    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 transform transition-all duration-200 ease-out">
            <div className="p-2">
                <div className="text-sm font-medium text-gray-600 px-3 py-2 border-b border-gray-100">
                    Seleccionar tipo de seguro
                </div>
                {insuranceOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => {
                            navigateTo(option.view);
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <div className="flex-shrink-0">
                            {option.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Componente Principal de la Página de Contactos ---
export default function Contactos({ navigateTo }) {
    const [contactsData, setContactsData] = useState(initialContactsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredContacts = contactsData.filter(contact =>
        contact.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.tipoSeguro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.telefono.includes(searchTerm)
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    };

    return (
        <div className="bg-slate-50 font-sans w-full min-h-screen p-6 sm:p-8 md:p-12">
            <main className="max-w-7xl mx-auto">
                {/* --- Cabecera --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                     <button onClick={() => navigateTo('landing')} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-4 sm:mb-0 transition-all duration-200 hover:scale-105">
                        <BackArrowIcon /> Volver
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 flex-grow sm:text-center">Contactos</h1>
                    <div className="relative">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="mt-4 sm:mt-0 px-5 py-3 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Agregar Contacto +
                            <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AddContactDropdown 
                            isOpen={isDropdownOpen}
                            onClose={() => setIsDropdownOpen(false)}
                            navigateTo={navigateTo}
                        />
                    </div>
                </div>

                {/* --- Sección de Estadísticas --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard 
                        icon={<FiUsers size={24} />}
                        title="Contactos totales"
                        value={contactsData.length.toString()}
                        detail={`↑ ${Math.floor(contactsData.length * 0.15)} nuevos este mes`}
                        detailColor="text-green-600"
                    />
                    <StatCard 
                        icon={<FiMail size={24} />}
                        title="Con email"
                        value={contactsData.filter(contact => contact.email).length.toString()}
                        detail={`${Math.round((contactsData.filter(contact => contact.email).length / contactsData.length) * 100)}% contactables`}
                        detailColor="text-blue-600"
                    />
                    <StatCard 
                        icon={<FiPhone size={24} />}
                        title="Con teléfono"
                        value={contactsData.filter(contact => contact.telefono).length.toString()}
                        detail={`${Math.round((contactsData.filter(contact => contact.telefono).length / contactsData.length) * 100)}% llamables`}
                        detailColor="text-green-600"
                    />
                </div>

                {/* --- Tabla de Contactos --- */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Todos los Contactos</h2>
                            <p className="text-sm text-teal-600 font-medium">Clientes registrados</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar contactos..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 focus:scale-105" 
                                />
                            </div>
                            <div className="relative">
                                <select className="appearance-none w-full md:w-auto pl-4 pr-10 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm font-medium text-gray-600">
                                    <option>Ordenar: Más reciente</option>
                                    <option>Más antiguo</option>
                                    <option>Nombre A-Z</option>
                                    <option>Nombre Z-A</option>
                                    <option>Por tipo de seguro</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    
                    {/* --- Contenedor de la Tabla para Desplazamiento --- */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-500 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nombre Completo</th>
                                    <th scope="col" className="px-6 py-3">Tipo de Seguro</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Teléfono</th>
                                    <th scope="col" className="px-6 py-3">Ubicación</th>
                                    <th scope="col" className="px-6 py-3">Fecha Registro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="bg-white border-b hover:bg-slate-50 transition-colors duration-200">
                                        <td className="px-6 py-4 font-medium text-gray-900">{contact.nombre}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <InsuranceTypeIcon type={contact.tipoSeguro} />
                                                <span>{contact.tipoSeguro}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.email ? (
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="text-blue-500" size={14} />
                                                    <span className="truncate max-w-[150px]">{contact.email}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Sin email</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.telefono ? (
                                                <div className="flex items-center gap-2">
                                                    <FiPhone className="text-green-500" size={14} />
                                                    <span>{contact.telefono}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Sin teléfono</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiMapPin className="text-gray-400" size={14} />
                                                <span className="truncate max-w-[100px]">{contact.provincia}, {contact.canton}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span>{formatDate(contact.fechaRegistro)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredContacts.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No se encontraron contactos que coincidan con la búsqueda.</p>
                        </div>
                    )}
                </div>

                {/* Overlay para cerrar dropdown cuando se hace clic fuera */}
                {isDropdownOpen && (
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>
                )}
            </main>
        </div>
    );
}