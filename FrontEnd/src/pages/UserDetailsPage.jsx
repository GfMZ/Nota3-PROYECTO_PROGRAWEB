import React, { useState } from 'react'; 
import { Lock } from 'lucide-react';
import UserOrdersTable from '../components/UserOrdersTable';
import UserDetailCard from '../components/UserDetailCard';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { useAuth } from '../context/AuthContext'; // Importar contexto

// Estilos (se mantienen igual que tu original)
const headerContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '2rem 2rem 0 2rem' };
const titleStyle = { fontSize: '1.875rem', fontWeight: '800', color: '#1F2937' };
const changePasswordButtonStyle = { backgroundColor: '#2563EB', color: 'white', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', transition: 'background-color 150ms', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', cursor: 'pointer', border: 'none' };

export default function UserDetailsPage() { 
    const { user } = useAuth(); // Obtener usuario real
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
    
    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    // Lógica para cambio de contraseña (Opcional por ahora)
    const handleChangePassword = async (passwords) => {
        // Aquí conectarías con un servicio de updatePassword si lo implementas en el backend
        console.log("Cambio solicitado para:", user?.email);
        alert("Funcionalidad de cambio de contraseña pendiente de endpoint en backend.");
        // await updatePasswordService(passwords);
    };
    
    if (!user) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Inicia sesión para ver tu perfil.</div>;
    }

    // Adaptamos el objeto user del backend para UserDetailCard
    const userDataForCard = {
        name: user.name,
        email: user.email,
        // Usamos la fecha de registro real o la actual si no existe
        registrationDate: new Date(user.registrationDate || Date.now()).toLocaleDateString(),
        status: 'Activo',
        // Imagen por defecto con la inicial del usuario
        imageUrl: user.imageUrl || `https://ui-avatars.com/api/?name=${user.name}&background=A8D08D&color=000`
    };

    return (
        <div className="bg-gray-100 font-sans" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <div>
                <div style={headerContainerStyle}>
                    <h1 style={titleStyle}>Hola, {user.name}</h1>
                    <button 
                        style={changePasswordButtonStyle}
                        onClick={handleOpenPasswordModal}
                    >
                        <Lock size={16} style={{ marginRight: '0.5rem' }} /> Cambiar contraseña
                    </button>
                </div>
                <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}> 
                    <UserDetailCard user={userDataForCard} /> 
                    
                    {/* UserOrdersTable ya se encarga de buscar sus propios datos de la API */}
                    <div style={{ marginTop: '2rem' }}>
                        <UserOrdersTable /> 
                    </div>
                </div>
            </div>
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                onSave={handleChangePassword}
            />
        </div>
    );
}