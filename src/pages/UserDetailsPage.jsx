// UserDetailsPage.jsx

import React, { useState } from 'react'; 
import { Lock } from 'lucide-react';

import UserOrdersTable from '../components/UserOrdersTable';
import HeaderA from '../components/HeaderA';
import SideMenuA from '../components/SideMenuA';
import UserDetailCard from '../components/UserDetailCard';
import ChangePasswordModal from '../components/ChangePasswordModal';

const mockUser = {
    id: 101,
    name: 'Juan Perez',
    email: 'juan.perez@gmail.com',
    registrationDate: '20/01/2025',
    status: 'Activo',
    imageUrl: 'https://placehold.co/160x160/A8D08D/000000?text=JP', 
};

const mockOrders = [
    { id: '#1234', date: '20/01/2025', total: 450.00, status: 'Completado' },
    { id: '#2356', date: '20/02/2025', total: 199.00, status: 'Completado' },
    { id: '#4577', date: '20/03/2025', total: 820.50, status: 'Completado' },
    { id: '#3743', date: '20/03/2025', total: 34.90, status: 'Completado' },
    { id: '#8910', date: '20/04/2025', total: 12.00, status: 'Completado' },
    { id: '#9999', date: '20/05/2025', total: 55.50, status: 'Completado' },
];

const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '2rem', 
    paddingLeft: '2rem', 
    paddingRight: '2rem'
};

// Estilo del texto h1
const titleStyle = {
    fontSize: '1.875rem', 
    fontWeight: '800', 
    color: '#1F2937', 
};

const changePasswordButtonStyle = {
    backgroundColor: '#2563EB', 
    color: 'white',
    fontWeight: '600', 
    paddingTop: '0.5rem', 
    paddingBottom: '0.5rem', 
    paddingLeft: '1rem', 
    paddingRight: '1rem', 
    borderRadius: '0.5rem', 
    fontSize: '0.875rem', 
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 150ms', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', 
    cursor: 'pointer',
    ':hover': { 
        backgroundColor: '#1D4ED8', 
    }
};


export default function UserDetailsPage() { 
    // ESTADOS
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
    
    // HANDLERS
    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    const handleChangePassword = (passwords) => {
        //----------------------------Cambiar contraseña----------------------------------------
        console.log("API CALL: Cambiando contraseña para el usuario:", mockUser.id);
        console.log("Contraseña Antigua:", passwords.oldPassword);
        console.log("Nueva Contraseña:", passwords.newPassword);
    };
    
    const handleEditUser = () => {
        console.log("Simulación: Iniciar edición de datos del usuario...");
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            
            <HeaderA /> 
            
            <div>
                <div>
                    <div style={headerContainerStyle}>
                        <h1 style={titleStyle}>Detalles de Usuario: {mockUser.name}</h1>
                        <button 
                            style={changePasswordButtonStyle}
                            onClick={handleOpenPasswordModal}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} 
                        >
                            <Lock size={16} style={{ marginRight: '0.5rem' }} /> Cambiar contraseña
                        </button>
                    </div>

                    <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}> 
                        <UserDetailCard user={mockUser} onEdit={handleEditUser} /> 
                        <UserOrdersTable orders={mockOrders} /> 
                    </div>
                    
                </div>
            </div>
            
            {/* MODAL */}
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                onSave={handleChangePassword}
            />
        </div>
    );
}