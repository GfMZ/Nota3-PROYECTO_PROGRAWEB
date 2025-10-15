// UserDetailsPage.jsx

import React, { useState } from 'react'; // 👈 Importamos useState
import Header from '../components/Header';
import UserDetailCard from '../components/UserDetailCard';
import UserOrdersTable from '../components/UserOrdersTable';
import ChangePasswordModal from '../components/ChangePasswordModal'; // 👈 Nuevo componente

export default function UserDetailsPage() {
    
    // 💥 NUEVO ESTADO: Controla la visibilidad de la modal de contraseña
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
    
    // NUEVAS FUNCIONES
    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    const handleChangePassword = (passwords) => {
        // Lógica para cambiar la contraseña (se implementará más tarde)
        console.log("Nueva Contraseña:", passwords.newPassword);
        handleClosePasswordModal(); // Cerrar al guardar
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
            <Header />
            <div style={mainLayoutStyles}>
                
                <div style={contentAreaStyles}>
                    
                    {/* ENCABEZADO: Conectamos el botón */}
                    <div style={headerStyles}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Detalles de usuario</h1>
                        <button 
                            style={changePasswordButtonStyles}
                            onClick={handleOpenPasswordModal} // 👈 Conexión al estado
                        >
                            <span style={{ marginRight: '5px' }}>&#9998;</span> Cambiar contraseña
                        </button>
                    </div>

                    {/* ... UserDetailCard y UserOrdersSection ... */}
                    
                </div>
            </div>
            
            {/* 💥 NUEVA MODAL: Renderizar el componente al final */}
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                onSave={handleChangePassword}
            />
        </div>
    );
}