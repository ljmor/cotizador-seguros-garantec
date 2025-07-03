import React from 'react';
import { FiUsers, FiUserCheck, FiMonitor, FiChevronDown, FiSearch } from 'react-icons/fi';

// --- Icono de Flecha para Volver ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- Datos de ejemplo para la tabla de clientes ---
const customerData = [
    { name: 'Jane Cooper', company: 'Microsoft', phone: '(225) 555-0118', email: 'jane@microsoft.com', country: 'United States', status: 'Active' },
    { name: 'Floyd Miles', company: 'Yahoo', phone: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'Inactive' },
    { name: 'Ronald Richards', company: 'Adobe', phone: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Israel', status: 'Inactive' },
    { name: 'Marvin McKinney', company: 'Tesla', phone: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'Active' },
    { name: 'Jerome Bell', company: 'Google', phone: '(629) 555-0129', email: 'jerome@google.com', country: 'Réunion', status: 'Active' },
    { name: 'Kathryn Murphy', company: 'Microsoft', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', country: 'Curaçao', status: 'Active' },
    { name: 'Jacob Jones', company: 'Yahoo', phone: '(208) 555-0112', email: 'jacob@yahoo.com', country: 'Brazil', status: 'Active' },
    { name: 'Kristin Watson', company: 'Facebook', phone: '(704) 555-0127', email: 'kristin@facebook.com', country: 'Åland Islands', status: 'Inactive' },
];

// --- Componente de Tarjeta de Estadísticas ---
const StatCard = ({ icon, title, value, detail, detailColor }) => (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-5">
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
const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 text-xs font-medium rounded-md ${
        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
        {status}
    </span>
);

// --- Componente Principal de la Página de Contactos ---
export default function Contactos({ navigateTo }) {
    return (
        <div className="bg-slate-50 font-sans w-full min-h-screen p-6 sm:p-8 md:p-12">
            <main className="max-w-7xl mx-auto">
                {/* --- Cabecera --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                     <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-4 sm:mb-0 transition">
                        <BackArrowIcon /> Volver
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 flex-grow sm:text-center">Contactos</h1>
                    <button className="mt-4 sm:mt-0 px-5 py-3 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition shadow-sm">
                        Agregar Contacto +
                    </button>
                </div>

                {/* --- Sección de Estadísticas --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard 
                        icon={<FiUsers size={24} />}
                        title="Contactos totales"
                        value="5,423"
                        detail="↑ 160 nuevos este mes"
                        detailColor="text-green-600"
                    />
                    <StatCard 
                        icon={<FiUserCheck size={24} />}
                        title="Contactados"
                        value="2,893"
                        detail="↓ 53% contactados"
                        detailColor="text-red-600"
                    />
                    <StatCard 
                        icon={<FiMonitor size={24} />}
                        title="Posibles clientes"
                        value="789"
                    />
                </div>

                {/* --- Tabla de Clientes --- */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">All Customers</h2>
                            <p className="text-sm text-green-600 font-medium">Active Members</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search" className="w-full md:w-48 pl-10 pr-4 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                            </div>
                            <div className="relative">
                                <select className="appearance-none w-full md:w-auto pl-4 pr-10 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm font-medium text-gray-600">
                                    <option>Short by: Newest</option>
                                    <option>Oldest</option>
                                    <option>Name</option>
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
                                    <th scope="col" className="px-6 py-3">Customer Name</th>
                                    <th scope="col" className="px-6 py-3">Company</th>
                                    <th scope="col" className="px-6 py-3">Phone Number</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Country</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.map((customer, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                                        <td className="px-6 py-4">{customer.company}</td>
                                        <td className="px-6 py-4">{customer.phone}</td>
                                        <td className="px-6 py-4">{customer.email}</td>
                                        <td className="px-6 py-4">{customer.country}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={customer.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
