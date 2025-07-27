import React, { useState, useEffect } from 'react';
import { FiUsers, FiTrendingUp, FiTarget, FiChevronDown, FiSearch, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import { FaCarAlt, FaHandHoldingHeart } from 'react-icons/fa';
import { RiStethoscopeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

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

// --- Componente de Tarjeta de Estadísticas ---
const StatCard = ({ icon, title, value, detail, detailColor }) => (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-5 transform transition-all duration-200 hover:scale-105 shadow-sm">
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

// --- Componente de Etiqueta de Estado de Cotización ---
const QuoteStatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Aceptada': return 'bg-green-100 text-green-700';
            case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
            case 'Por confirmar': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    return <span className={`px-3 py-1 text-xs font-medium rounded-md ${getStatusStyles(status)}`}>{status}</span>;
};

// --- Componente de Etiqueta de Prioridad ---
const PriorityBadge = ({ priority }) => {
    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'Alta': return 'bg-red-100 text-red-700';
            case 'Media': return 'bg-orange-100 text-orange-700';
            case 'Baja': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityStyles(priority)}`}>{priority}</span>;
};

// --- Componente de Icono de Tipo de Seguro ---
const InsuranceTypeIcon = ({ type }) => {
    switch (type) {
        case 'Vida': return <VidaIcon />;
        case 'Salud': return <SaludIcon />;
        case 'Auto': return <AutoIcon />;
        default: return <FiTarget className="h-4 w-4 text-gray-500" />;
    }
};

// --- Componente Principal de la Página de Oportunidades ---
export default function Oportunidades({ navigateTo }) {
    const [opportunityData, setOpportunityData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');

    useEffect(() => {
        const fetchOpportunities = async () => {
            setCargando(true);
            try {
                const respuesta = await fetch('http://localhost:5000/api/oportunidades');
                const data = await respuesta.json();
                setOpportunityData(data);
            } catch (error) {
                console.error("Error al obtener oportunidades:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchOpportunities();
    }, []);

    const filteredOpportunities = opportunityData.filter(opportunity => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            (opportunity.nombre && opportunity.nombre.toLowerCase().includes(search)) ||
            (opportunity.tipoSeguro && opportunity.tipoSeguro.toLowerCase().includes(search)) ||
            (opportunity.email && opportunity.email.toLowerCase().includes(search)) ||
            (opportunity.telefono && opportunity.telefono.includes(search)) ||
            (opportunity.estadoCotizacion && opportunity.estadoCotizacion.toLowerCase().includes(search));
        
        const matchesFilter = filterStatus === 'Todos' || opportunity.estadoCotizacion === filterStatus;
        
        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formatCurrency = (amount) => `$${(amount || 0).toFixed(2)}`;

    const aceptadas = opportunityData.filter(opp => opp.estadoCotizacion === 'Aceptada').length;
    const pendientes = opportunityData.filter(opp => opp.estadoCotizacion === 'Pendiente').length;
    const porConfirmar = opportunityData.filter(opp => opp.estadoCotizacion === 'Por confirmar').length;
    const valorTotal = opportunityData.reduce((sum, opp) => sum + (opp.valorEstimado || 0), 0);

    if (cargando) {
        return <div className="p-8 text-center text-xl font-semibold">Cargando oportunidades...</div>;
    }

    return (
        <div className="bg-slate-50 font-sans w-full min-h-screen p-6 sm:p-8 md:p-12">
            <main className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <button onClick={() => navigateTo('landing')} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-4 sm:mb-0 transition-all duration-200 hover:scale-105">
                        <BackArrowIcon /> Volver
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 flex-grow sm:text-center">Oportunidades</h1>
                    <div className="mt-4 sm:mt-0 flex items-center gap-3">
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm font-medium text-gray-600"
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="Por confirmar">Por confirmar</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aceptada">Aceptada</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard 
                        icon={<FiUsers size={24} />}
                        title="Total oportunidades"
                        value={opportunityData.length.toString()}
                        detail={`${formatCurrency(valorTotal)} valor total`}
                        detailColor="text-green-600"
                    />
                    <StatCard 
                        icon={<FiTrendingUp size={24} />}
                        title="Aceptadas"
                        value={aceptadas.toString()}
                        detail={`${Math.round((aceptadas / (opportunityData.length || 1)) * 100)}% conversión`}
                        detailColor="text-green-600"
                    />
                    <StatCard 
                        icon={<FiTarget size={24} />}
                        title="Pendientes"
                        value={pendientes.toString()}
                        detail="Requieren seguimiento"
                        detailColor="text-orange-600"
                    />
                    <StatCard 
                        icon={<FiClock size={24} />}
                        title="Por confirmar"
                        value={porConfirmar.toString()}
                        detail="Próximas a cerrar"
                        detailColor="text-blue-600"
                    />
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Pipeline de Ventas</h2>
                            <p className="text-sm text-teal-600 font-medium">Oportunidades de negocio activas</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar oportunidades..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 focus:scale-105" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-500 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Cliente Potencial</th>
                                    <th scope="col" className="px-6 py-3">Tipo de Seguro</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Teléfono</th>
                                    <th scope="col" className="px-6 py-3">Estado Cotización</th>
                                    <th scope="col" className="px-6 py-3">Valor Estimado</th>
                                    <th scope="col" className="px-6 py-3">Fecha Contacto</th>
                                    <th scope="col" className="px-6 py-3">Prioridad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOpportunities.map((opportunity) => (
                                    <tr key={opportunity.id} className="bg-white border-b hover:bg-slate-50 transition-colors duration-200">
                                        <td className="px-6 py-4 font-medium text-gray-900">{opportunity.nombre}</td>
                                        <td className="px-6 py-4"><div className="flex items-center gap-2"><InsuranceTypeIcon type={opportunity.tipoSeguro} /><span>{opportunity.tipoSeguro}</span></div></td>
                                        <td className="px-6 py-4">{opportunity.email ? <div className="flex items-center gap-2"><FiMail className="text-blue-500" size={14} /><span className="truncate max-w-[150px]">{opportunity.email}</span></div> : <span className="text-gray-400">Sin email</span>}</td>
                                        <td className="px-6 py-4">{opportunity.telefono ? <div className="flex items-center gap-2"><FiPhone className="text-green-500" size={14} /><span>{opportunity.telefono}</span></div> : <span className="text-gray-400">Sin teléfono</span>}</td>
                                        <td className="px-6 py-4"><QuoteStatusBadge status={opportunity.estadoCotizacion} /></td>
                                        <td className="px-6 py-4"><span className="font-semibold text-green-600">{formatCurrency(opportunity.valorEstimado)} / mes</span></td>
                                        <td className="px-6 py-4"><span>{formatDate(opportunity.fechaContacto)}</span></td>
                                        <td className="px-6 py-4"><PriorityBadge priority={opportunity.prioridad} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredOpportunities.length === 0 && (<div className="text-center py-8"><p className="text-gray-500">No se encontraron oportunidades que coincidan con los filtros.</p></div>)}
                </div>
            </main>
        </div>
    );
}
