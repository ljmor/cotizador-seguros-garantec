import React, { useState } from 'react';
import { FiUsers, FiUserPlus, FiPhone, FiMail, FiChevronDown, FiSearch, FiX, FiCalendar, FiFileText } from 'react-icons/fi';

// --- Icono de Flecha para Volver ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- Datos de ejemplo para posibles clientes ---
const initialLeadsData = [
    { id: 1, name: 'Ana Martínez', phone: '(593) 987-654-321', email: 'ana.martinez@gmail.com', date: '2025-07-20', notes: 'Interesada en seguro de vida' },
    { id: 2, name: 'Carlos López', phone: '(593) 998-123-456', email: '', date: '2025-07-18', notes: 'Llamó preguntando por seguro de auto' },
    { id: 3, name: 'María González', phone: '(593) 987-321-654', email: 'maria.gonzalez@hotmail.com', date: '2025-07-15', notes: 'Referido por cliente actual' },
    { id: 4, name: 'Roberto Silva', phone: '', email: 'roberto.silva@yahoo.com', date: '2025-07-12', notes: 'Completó formulario web' },
    { id: 5, name: 'Patricia Ramírez', phone: '(593) 999-888-777', email: 'patricia.r@outlook.com', date: '2025-07-10', notes: 'Seguro oncológico para familiar' },
    { id: 6, name: 'Diego Morales', phone: '(593) 987-111-222', email: '', date: '2025-07-08', notes: 'Cotización familiar pendiente' },
    { id: 7, name: 'Laura Vásquez', phone: '(593) 998-333-444', email: 'laura.vasquez@gmail.com', date: '2025-07-05', notes: 'Seguimiento programado' },
    { id: 8, name: 'Fernando Castro', phone: '(593) 987-555-666', email: 'fernando.castro@empresa.com', date: '2025-07-02', notes: 'Seguro empresarial grupo' },
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

// --- Componente de Modal para Agregar/Editar Posible Cliente ---
const AddLeadModal = ({ isOpen, onClose, onSave, editingLead = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Manejo de animaciones de entrada y salida
    React.useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Pequeño delay para asegurar que el DOM se renderice antes de la animación
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            // Esperar a que termine la animación antes de desmontar
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);

    // Cargar datos cuando se abre para editar
    React.useEffect(() => {
        if (editingLead) {
            const nameParts = editingLead.name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            setFormData({
                name: firstName,
                lastName: lastName,
                phone: editingLead.phone || '',
                email: editingLead.email || '',
                date: editingLead.date || new Date().toISOString().split('T')[0],
                notes: editingLead.notes || ''
            });
        } else {
            setFormData({
                name: '',
                lastName: '',
                phone: '',
                email: '',
                date: new Date().toISOString().split('T')[0],
                notes: ''
            });
        }
    }, [editingLead, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim()) {
            const fullName = formData.lastName ? `${formData.name} ${formData.lastName}` : formData.name;
            const leadData = {
                id: editingLead ? editingLead.id : Date.now(),
                name: fullName,
                phone: formData.phone,
                email: formData.email,
                date: formData.date,
                notes: formData.notes
            };
            onSave(leadData, editingLead ? 'edit' : 'add');
            if (!editingLead) {
                setFormData({
                    name: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    date: new Date().toISOString().split('T')[0],
                    notes: ''
                });
            }
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!shouldRender) return null;

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out ${
                isVisible 
                    ? 'bg-gray-900 bg-opacity-40' 
                    : 'bg-transparent'
            }`}
            style={{
                backdropFilter: isVisible ? 'blur(4px)' : 'none',
                WebkitBackdropFilter: isVisible ? 'blur(4px)' : 'none'
            }}
            onClick={handleBackdropClick}
        >
            <div className={`bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ease-out ${
                isVisible 
                    ? 'scale-100 opacity-100 translate-y-0' 
                    : 'scale-90 opacity-0 translate-y-8'
            }`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {editingLead ? 'Editar Cliente' : 'Agregar Posible Cliente'}
                        </h2>
                        <button 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-full p-2 hover:scale-110"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Nombre *</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 focus:scale-[1.02]" 
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                        
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Apellido (opcional)</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 focus:scale-[1.02]" 
                                placeholder="Ingrese el apellido"
                            />
                        </div>
                        
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 focus:scale-[1.02]" 
                                placeholder="(593) 987-654-321"
                            />
                        </div>
                        
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Correo (opcional)</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 focus:scale-[1.02]" 
                                placeholder="ejemplo@correo.com"
                            />
                        </div>
                        
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de contacto</label>
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 focus:scale-[1.02]" 
                            />
                        </div>
                        
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Notas</label>
                            <textarea 
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none focus:scale-[1.02]" 
                                placeholder="Información adicional sobre el posible cliente..."
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="flex-1 px-4 py-2 rounded-lg text-gray-600 font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 px-4 py-2 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                            >
                                {editingLead ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Componente Principal de la Página de Posibles Clientes ---
export default function PosiblesClientes({ navigateTo }) {
    const [leadsData, setLeadsData] = useState(initialLeadsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddLead = (leadData, action) => {
        if (action === 'edit') {
            setLeadsData(prev => prev.map(lead => 
                lead.id === leadData.id ? leadData : lead
            ));
        } else {
            setLeadsData(prev => [leadData, ...prev]);
        }
        setIsModalOpen(false);
        setEditingLead(null);
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };

    const filteredLeads = leadsData.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                     <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-4 sm:mb-0 transition">
                        <BackArrowIcon /> Volver
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 flex-grow sm:text-center">Posibles Clientes</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 sm:mt-0 px-5 py-3 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        Agregar Lead +
                    </button>
                </div>

                {/* --- Sección de Estadísticas --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard 
                        icon={<FiUsers size={24} />}
                        title="Total Leads"
                        value={leadsData.length.toString()}
                        detail="↑ 12 nuevos esta semana"
                        detailColor="text-green-600"
                    />
                    <StatCard 
                        icon={<FiPhone size={24} />}
                        title="Con Teléfono"
                        value={leadsData.filter(lead => lead.phone).length.toString()}
                        detail={`${Math.round((leadsData.filter(lead => lead.phone).length / leadsData.length) * 100)}% del total`}
                        detailColor="text-blue-600"
                    />
                    <StatCard 
                        icon={<FiMail size={24} />}
                        title="Con Email"
                        value={leadsData.filter(lead => lead.email).length.toString()}
                        detail={`${Math.round((leadsData.filter(lead => lead.email).length / leadsData.length) * 100)}% del total`}
                        detailColor="text-purple-600"
                    />
                </div>

                {/* --- Tabla de Posibles Clientes --- */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Lista de Leads</h2>
                            <p className="text-sm text-teal-600 font-medium">Posibles clientes a cotizar</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar leads..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                                />
                            </div>
                            <div className="relative">
                                <select className="appearance-none w-full md:w-auto pl-4 pr-10 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm font-medium text-gray-600">
                                    <option>Ordenar: Más reciente</option>
                                    <option>Más antiguo</option>
                                    <option>Nombre A-Z</option>
                                    <option>Nombre Z-A</option>
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
                                    <th scope="col" className="px-6 py-3">Nombre</th>
                                    <th scope="col" className="px-6 py-3">Teléfono</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Fecha</th>
                                    <th scope="col" className="px-6 py-3">Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr 
                                        key={lead.id} 
                                        className="bg-white border-b hover:bg-slate-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => handleEditLead(lead)}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                        <td className="px-6 py-4">
                                            {lead.phone ? (
                                                <div className="flex items-center gap-2">
                                                    <FiPhone className="text-green-500" size={14} />
                                                    <span>{lead.phone}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Sin teléfono</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.email ? (
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="text-blue-500" size={14} />
                                                    <span className="truncate max-w-[150px]">{lead.email}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Sin email</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-gray-400" size={14} />
                                                <span>{formatDate(lead.date)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.notes ? (
                                                <div className="flex items-center gap-2">
                                                    <FiFileText className="text-indigo-500" size={14} />
                                                    <span className="truncate max-w-[200px]" title={lead.notes}>
                                                        {lead.notes}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">Sin notas</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredLeads.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No se encontraron leads que coincidan con la búsqueda.</p>
                        </div>
                    )}
                </div>
            </main>
            
            {/* --- Modal para Agregar/Editar Lead --- */}
            <AddLeadModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddLead}
                editingLead={editingLead}
            />
        </div>
    );
}