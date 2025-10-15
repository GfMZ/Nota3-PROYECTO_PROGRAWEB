import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

// =========================================================================
// DEFINICIÓN DE ESTILOS BASE Y HOVER PARA INPUTS Y BOTONES (PURAS PROPIEDADES CSS)
// =========================================================================

// Estilo de los campos de input
const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #D1D5DB', // border-gray-300
    borderRadius: '0.5rem', // rounded-lg
    outline: 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    // Aseguramos que el foco también se maneje con estilo en línea
    // Nota: El foco requiere un manejo avanzado con React si el navegador no lo soporta automáticamente
    // Aquí solo definimos el estilo base
};

// Estilos del botón de GUARDAR (Verde)
const saveButtonStyleBase = {
    backgroundColor: '#059669', // green-600
    color: 'white',
    fontWeight: '600', // font-semibold
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'background-color 150ms',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    border: 'none',
};
const saveButtonStyleHover = {
    backgroundColor: '#047857', // hover:bg-green-700
};

// Estilos del botón de CANCELAR (Gris)
const cancelButtonStyleBase = {
    backgroundColor: '#9CA3AF', // gray-400
    color: 'white',
    fontWeight: '600', // font-semibold
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'background-color 150ms',
    cursor: 'pointer',
    border: 'none',
};
const cancelButtonStyleHover = {
    backgroundColor: '#6B7280', // hover:bg-gray-500
};

// Estilo del contenedor principal de la modal (CRÍTICO para la superposición)
const modalContainerStyle = {
    position: 'fixed', // Esto asegura que se posicione respecto al viewport
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black bg-opacity-50
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Aumentado el z-index para asegurar la superposición total
    padding: '1rem',
};

// Estilo del contenido interno de la modal
const modalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem', // rounded-xl
    width: '100%',
    maxWidth: '28rem', // max-w-md
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-2xl
    position: 'relative',
};

export default function ChangePasswordModal({ isOpen, onClose, onSave }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    
    // Estados para el manejo de hover en los botones
    const [isSaveHovered, setIsSaveHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);
    // Estado para el hover en el botón de cerrar (X)
    const [isCloseHovered, setIsCloseHovered] = useState(false);


    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault();
        setError('');
        setStatusMessage(null);

        if (newPassword !== confirmPassword) {
            setError('Las nuevas contraseñas no coinciden.');
            return;
        }
        if (newPassword.length < 8) {
            setError('La nueva contraseña debe tener al menos 8 caracteres.');
            return;
        }

        onSave({ oldPassword, newPassword });
        setStatusMessage('Contraseña cambiada exitosamente (simulado).');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Cierra la modal después de un breve retraso
        setTimeout(onClose, 1500);
    };
    
    // Estilos dinámicos para los botones (combina base + hover si es necesario)
    const dynamicSaveStyle = {
        ...saveButtonStyleBase,
        ...(isSaveHovered ? saveButtonStyleHover : {}),
    };
    const dynamicCancelStyle = {
        ...cancelButtonStyleBase,
        ...(isCancelHovered ? cancelButtonStyleHover : {}),
    };
    
    // Estilos para los mensajes de error/éxito
    const errorMsgStyle = { backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500' };
    const successMsgStyle = { backgroundColor: '#D1FAE5', color: '#047857', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500' };
    
    // Estilo del botón de cerrar (X)
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
        color: '#4B5563', // hover:text-gray-600
    }


    return (
        <div style={modalContainerStyle}>
            <div style={modalContentStyle}>
                
                {/* Botón de cerrar (X) con manejo de hover en línea */}
                <button 
                    onClick={onClose} 
                    style={{ ...closeButtonStyleBase, ...(isCloseHovered ? closeButtonStyleHover : {}) }}
                    onMouseEnter={() => setIsCloseHovered(true)}
                    onMouseLeave={() => setIsCloseHovered(false)}
                >
                    <X size={24} />
                </button>
                
                {/* Título de la modal */}
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700', color: '#1F2937', display: 'flex', alignItems: 'center' }}>
                    <Lock size={20} style={{ marginRight: '0.5rem', color: '#059669' }} /> Cambiar Contraseña
                </h2>

                {/* Mensajes de estado/error */}
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
                        />
                    </div>

                    {/* Botones de acción con estilos dinámicos */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            style={dynamicCancelStyle}
                            onMouseEnter={() => setIsCancelHovered(true)}
                            onMouseLeave={() => setIsCancelHovered(false)}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={dynamicSaveStyle}
                            onMouseEnter={() => setIsSaveHovered(true)}
                            onMouseLeave={() => setIsSaveHovered(false)}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
