import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
// --- IMPORTS AÑADIDOS ---
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../services/authService'; 
// ------------------------

const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #D1D5DB', 
    borderRadius: '0.5rem', 
    outline: 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
};

const saveButtonStyleBase = {
    backgroundColor: '#059669', 
    color: 'white',
    fontWeight: '600', 
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'background-color 150ms',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    border: 'none',
};
const saveButtonStyleHover = {
    backgroundColor: '#047857', 
};

const cancelButtonStyleBase = {
    backgroundColor: '#9CA3AF', 
    color: 'white',
    fontWeight: '600', 
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'background-color 150ms',
    cursor: 'pointer',
    border: 'none',
};
const cancelButtonStyleHover = {
    backgroundColor: '#6B7280', 
};

const modalContainerStyle = {
    position: 'fixed', 
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
    padding: '1rem',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem', 
    width: '100%',
    maxWidth: '28rem', 
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
    position: 'relative',
};

export default function ChangePasswordModal({ isOpen, onClose }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    const [isSaving, setIsSaving] = useState(false); // Estado de carga
    
    
    const [isSaveHovered, setIsSaveHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    const { getAuthHeader } = useAuth(); // Obtenemos el token para el API

    if (!isOpen) return null;

    const handleSave = async (e) => { 
        e.preventDefault();
        setError('');
        setStatusMessage(null);

        // 1. Validaciones locales
        if (newPassword !== confirmPassword) {
            setError('Las nuevas contraseñas no coinciden.');
            return;
        }
        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setIsSaving(true); 

        try {
            // 2. Llamada al servicio con las tres contraseñas y el token
            const passwords = { oldPassword, newPassword };
            const result = await changePassword(passwords, getAuthHeader());
            
            // 3. Éxito
            setStatusMessage(result.message || 'Contraseña cambiada exitosamente.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
            setTimeout(onClose, 1500);
            
        } catch (err) {
            // 4. Fallo (ej: contraseña antigua incorrecta)
            setError(err.message || 'Error al cambiar la contraseña.');
        } finally {
            setIsSaving(false); 
        }
    };
    
    
    const dynamicSaveStyle = {
        ...saveButtonStyleBase,
        ...(isSaveHovered ? saveButtonStyleHover : {}),
        opacity: isSaving ? 0.7 : 1, 
        cursor: isSaving ? 'not-allowed' : 'pointer'
    };
    const dynamicCancelStyle = {
        ...cancelButtonStyleBase,
        ...(isCancelHovered ? cancelButtonStyleHover : {}),
    };
    
    const errorMsgStyle = { backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500' };
    const successMsgStyle = { backgroundColor: '#D1FAE5', color: '#047857', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500' };
    
    const closeButtonStyleBase = { 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        color: '#9CA3AF', 
        cursor: 'pointer', 
        transition: 'color 150ms',
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
    };
    const closeButtonStyleHover = {
        color: '#4B5563', 
    }

    return (
        <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
                
                <button 
                    onClick={onClose} 
                    style={{ ...closeButtonStyleBase, ...(isCloseHovered ? closeButtonStyleHover : {}) }}
                    onMouseEnter={() => setIsCloseHovered(true)}
                    onMouseLeave={() => setIsCloseHovered(false)}
                    disabled={isSaving} // Deshabilitar cierre mientras guarda
                >
                    <X size={24} />
                </button>
                
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700', color: '#1F2937', display: 'flex', alignItems: 'center' }}>
                    <Lock size={20} style={{ marginRight: '0.5rem', color: '#059669' }} /> Cambiar Contraseña
                </h2>

                {error && <div style={errorMsgStyle}>{error}</div>}
                {statusMessage && <div style={successMsgStyle}>{statusMessage}</div>}

                <form onSubmit={handleSave}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem', color: '#374151' }}>Contraseña Antigua</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={inputStyle}
                            required
                            disabled={isSaving}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem', color: '#374151' }}>Nueva Contraseña</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={inputStyle}
                            required
                            disabled={isSaving}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem', color: '#374151' }}>Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={inputStyle}
                            required
                            disabled={isSaving}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            style={dynamicCancelStyle}
                            onMouseEnter={() => setIsCancelHovered(true)}
                            onMouseLeave={() => setIsCancelHovered(false)}
                            disabled={isSaving}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={dynamicSaveStyle}
                            onMouseEnter={() => setIsSaveHovered(true)}
                            onMouseLeave={() => setIsSaveHovered(false)}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}