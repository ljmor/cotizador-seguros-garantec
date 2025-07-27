import React, { useState, useEffect } from 'react';
import { FiUsers, FiPhone, FiMail, FiChevronDown, FiSearch, FiX, FiMapPin, FiTag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icono de Flecha para Volver ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- Componente de Tarjeta de Estadísticas ---
const StatCard = ({ icon, title, value, detail, detailColor }) => (
    <div className="bg-white p-6 rounded-2xl flex items-center gap-5 shadow-sm">
        <div className="bg-indigo-100 text-indigo-500 p-4 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {detail && <p className={`text-xs font-medium ${detailColor || 'text-gray-500'}`}>{detail}</p>}
        </div>
    </div>
);

// --- Componente de Modal para Agregar/Editar Contacto ---
const AddContactModal = ({ isOpen, onClose, onSave, editingContact = null }) => {
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        if (isOpen) {
            if (editingContact) {
                setFormData({
                    nombres: editingContact.nombres || '',
                    apellidos: editingContact.apellidos || '',
                    telefono: editingContact.phone || '',
                    email: editingContact.email || ''
                });
            } else {
                setFormData({ nombres: '', apellidos: '', telefono: '', email: '' });
            }
        }
    }, [editingContact, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nombres && formData.nombres.trim()) {
            onSave(formData, editingContact);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-900 bg-opacity-40 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">{editingContact ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-full p-2 hover:scale-110"><FiX size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" name="nombres" value={formData.nombres || ''} onChange={handleInputChange} required placeholder="Nombre *" className="w-full px-4 py-2 border rounded-lg" />
                                <input type="text" name="apellidos" value={formData.apellidos || ''} onChange={handleInputChange} placeholder="Apellido" className="w-full px-4 py-2 border rounded-lg" />
                                <input type="tel" name="telefono" value={formData.telefono || ''} onChange={handleInputChange} placeholder="Teléfono" className="w-full px-4 py-2 border rounded-lg" />
                                <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Correo" className="w-full px-4 py-2 border rounded-lg" />
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg text-gray-600 font-semibold border hover:bg-gray-50">Cancelar</button>
                                    <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500">{editingContact ? 'Actualizar' : 'Guardar'}</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Componente Principal de la Página de Contactos ---
export default function Contactos({ navigateTo }) {
    const [contactsData, setContactsData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchContacts = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch('http://localhost:5000/api/cotizaciones');
            const data = await respuesta.json();
            setContactsData(data); // Obtenemos TODOS los contactos
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleSaveContact = async (formData, contactToEdit) => {
        const esActualizacion = !!contactToEdit;
        const url = esActualizacion ? `http://localhost:5000/api/cotizaciones/${contactToEdit.id}` : 'http://localhost:5000/api/cotizaciones';
        const method = esActualizacion ? 'PUT' : 'POST';

        const payload = {
            ...contactToEdit,
            ...formData,
            tipoSeguroPrincipal: contactToEdit?.type || 'Indefinido',
        };
        
        try {
            const respuesta = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!respuesta.ok) throw new Error('Error al guardar el contacto');
            
            handleCloseModal();
            fetchContacts(); // Refresca la lista después de guardar
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const filteredContacts = contactsData.filter(contact =>
        (contact.nombres + ' ' + contact.apellidos).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.phone && contact.phone.includes(searchTerm)) ||
        (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

    if (cargando) {
        return <div className="p-8 text-center text-xl font-semibold">Cargando contactos...</div>;
    }

    return (
        <div className="bg-slate-50 font-sans w-full min-h-screen p-6 sm:p-8 md:p-12">
            <main className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <button onClick={() => navigateTo('landing')} className="flex items-center gap-2 text-gray-500 font-semibold hover:text-indigo-600 mb-4 sm:mb-0 transition">
                        <BackArrowIcon /> Volver
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 flex-grow sm:text-center">Contactos</h1>
                    <button onClick={() => setIsModalOpen(true)} className="mt-4 sm:mt-0 px-5 py-3 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95">
                        Agregar Contacto +
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard icon={<FiUsers size={24} />} title="Contactos Totales" value={contactsData.length.toString()} detail="↑ 1 nuevo este mes" detailColor="text-green-600" />
                    <StatCard icon={<FiMail size={24} />} title="Con Email" value={contactsData.filter(c => c.email).length.toString()} detail={`${Math.round((contactsData.filter(c => c.email).length / (contactsData.length || 1)) * 100)}% contactables`} detailColor="text-blue-600" />
                    <StatCard icon={<FiPhone size={24} />} title="Con Teléfono" value={contactsData.filter(c => c.phone).length.toString()} detail={`${Math.round((contactsData.filter(c => c.phone).length / (contactsData.length || 1)) * 100)}% llamables`} detailColor="text-purple-600" />
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Todos los Contactos</h2>
                            <p className="text-sm text-gray-500 font-medium">Clientes registrados</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Buscar contactos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                            </div>
                        </div>
                    </div>
                    
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
                                    <tr key={contact.id} className="bg-white border-b hover:bg-slate-50 cursor-pointer transition-colors duration-200" onClick={() => handleEditContact(contact)}>
                                        <td className="px-6 py-4 font-medium text-gray-900">{contact.nombres} {contact.apellidos}</td>
                                        <td className="px-6 py-4"><div className="flex items-center gap-2"><FiTag className="text-gray-400" size={14} /><span>{contact.type}</span></div></td>
                                        <td className="px-6 py-4">{contact.email ? <div className="flex items-center gap-2"><FiMail className="text-blue-500" size={14} /><span className="truncate max-w-[150px]">{contact.email}</span></div> : <span className="text-gray-400">Sin email</span>}</td>
                                        <td className="px-6 py-4">{contact.phone ? <div className="flex items-center gap-2"><FiPhone className="text-green-500" size={14} /><span>{contact.phone}</span></div> : <span className="text-gray-400">Sin teléfono</span>}</td>
                                        <td className="px-6 py-4"><div className="flex items-center gap-2"><FiMapPin className="text-orange-500" size={14} /><span>{contact.location}</span></div></td>
                                        <td className="px-6 py-4">{formatDate(contact.time)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredContacts.length === 0 && (<div className="text-center py-8"><p className="text-gray-500">No se encontraron contactos.</p></div>)}
                </div>
            </main>
            
            <AddContactModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveContact} editingContact={editingContact} />
        </div>
    );
}
