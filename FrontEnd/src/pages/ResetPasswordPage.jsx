import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
// Asegúrate de importar el servicio correcto
import { submitNewPassword } from '../services/authService'; 

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#fafafa',
};

const boxStyle = {
    backgroundColor: 'white',
    border: '1px solid #eee',
    padding: '40px 36px',
    borderRadius: '12px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    textAlign: 'center'
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '15px'
};

const buttonStyle = {
    backgroundColor: '#2e9b1f', 
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '10px 0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'opacity 0.3s'
};

export default function ResetPasswordPage() {
    const { token } = useParams(); // Capturamos el token de la URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setIsError(true);
            return;
        }
        if (!token) {
            setMessage('Error: Token de restablecimiento faltante o inválido.');
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            // Llama al servicio del backend para actualizar la contraseña
            const result = await submitNewPassword(token, newPassword);
            
            setIsError(false);
            setMessage(result.message); 
            
            // Redirigir a login tras éxito
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            setIsError(true);
            setMessage(error.message || 'Error: El token ha expirado o es inválido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <Lock size={32} style={{ color: '#2e9b1f', marginBottom: '15px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Establecer Nueva Contraseña
                </h2>
                <p style={{ color: '#777', marginBottom: '20px', fontSize: '14px' }}>
                    Ingrese su nueva contraseña segura.
                </p>

                {message && (
                    <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '15px', color: isError ? '#991b1b' : '#059669', backgroundColor: isError ? '#fee2e2' : '#d1fae5' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nueva Contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={inputStyle}
                        disabled={isLoading}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={inputStyle}
                        disabled={isLoading}
                        required
                    />
                    <button
                        type="submit"
                        style={{ ...buttonStyle, opacity: isLoading ? 0.7 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Restablecer Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
}