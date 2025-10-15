import React, { useState } from 'react';

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
    
    // Estado local para los campos del formulario
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    if (!isOpen) {
        return null;
    }

    // --- ESTILOS (Reutilizados de AddCategoryForm) ---
    const modalOverlayStyles = { /* ... estilos ... */ };
    const modalContentStyles = { 
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '450px', // Hacemos la modal un poco más estrecha
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    };
    const titleStyles = { /* ... estilos ... */ };
    const labelStyles = { /* ... estilos ... */ };
    const inputStyles = { /* ... estilos ... */ };
    const saveButtonStyles = { /* ... estilos ... */ };
    const footerStyles = { /* ... estilos ... */ };
    
    // (Añade o importa los estilos de la modal de tu AddCategoryForm aquí)
    const getModalBaseStyles = () => ({
        modalOverlayStyles: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', zIndex: 1000
        },
        titleStyles: {
            fontSize: '20px', fontWeight: 'bold', marginBottom: '25px', 
            borderBottom: '1px solid #eee', paddingBottom: '15px'
        },
        labelStyles: {
            display: 'block', fontSize: '14px', fontWeight: 'bold', 
            marginBottom: '8px', color: '#333'
        },
        inputStyles: {
            width: '100%', padding: '10px 12px', marginBottom: '20px', 
            border: '1px solid #ccc', borderRadius: '5px', 
            boxSizing: 'border-box', fontSize: '14px'
        },
        saveButtonStyles: {
            backgroundColor: '#4CAF50', color: 'white', border: 'none', 
            borderRadius: '5px', padding: '10px 15px', cursor: 'pointer', 
            fontSize: '16px', fontWeight: 'bold', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', float: 'right'
        },
        footerStyles: {
            paddingTop: '15px', overflow: 'hidden'
        }
    });

    const styles = getModalBaseStyles();

    // --- FUNCIÓN DE MANEJO DE ENVÍO ---
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("La nueva contraseña y la confirmación no coinciden.");
            return;
        }
        
        if (newPassword === currentPassword) {
            alert("La nueva contraseña debe ser diferente a la actual.");
            return;
        }

        onSave({ 
            currentPassword: currentPassword, 
            newPassword: newPassword 
        });

        // Limpiar formulario al guardar
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    // --- RENDERIZADO DEL COMPONENTE ---
    return (
        <div style={styles.modalOverlayStyles} onClick={onClose}>
            <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}> 
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.titleStyles}>Cambiar contraseña</div>

                    {/* Contraseña Actual */}
                    <label htmlFor="currentPassword" style={styles.labelStyles}>Contraseña actual</label>
                    <input
                        id="currentPassword"
                        type="password"
                        placeholder="Contraseña actual"
                        style={styles.inputStyles}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    {/* Nueva Contraseña */}
                    <label htmlFor="newPassword" style={styles.labelStyles}>Nueva contraseña</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        style={styles.inputStyles}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    {/* Confirmar Nueva Contraseña */}
                    <label htmlFor="confirmNewPassword" style={styles.labelStyles}>Confirmar nueva contraseña</label>
                    <input
                        id="confirmNewPassword"
                        type="password"
                        placeholder="Repite la nueva contraseña"
                        style={styles.inputStyles}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />

                    {/* Footer y Botón de Acción */}
                    <div style={styles.footerStyles}>
                        <button type="submit" style={styles.saveButtonStyles}>
                             <span style={{ marginRight: '5px' }}>&#x2713;</span> Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;