import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Asegúrate de importar el servicio correcto
import { requestPasswordReset } from '../services/authService'; 
import { Lock } from 'lucide-react';

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
    backgroundColor: '#3b82f6', 
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '10px 0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'opacity 0.3s'
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Por favor, ingrese su correo electrónico.');
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            // Llama a la función del backend para generar el token
            const result = await requestPasswordReset(email);
            
            setIsError(false);
            // Mensaje de éxito del backend (oculta si el email existe o no)
            setMessage(result.message); 
            setEmail('');

        } catch (error) {
            setIsError(true);
            setMessage(error.message || 'Error de conexión al servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <Lock size={32} style={{ color: '#3b82f6', marginBottom: '15px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                    ¿Olvidó su Contraseña?
                </h2>
                <p style={{ color: '#777', marginBottom: '20px', fontSize: '14px' }}>
                    Ingrese su correo para recibir un enlace de restablecimiento.
                </p>

                {message && (
                    <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '15px', color: isError ? '#991b1b' : '#059669', backgroundColor: isError ? '#fee2e2' : '#d1fae5' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        disabled={isLoading}
                        required
                    />
                    <button
                        type="submit"
                        style={{ ...buttonStyle, opacity: isLoading ? 0.7 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Solicitar Restablecimiento'}
                    </button>
                </form>
                
                <Link to="/login" style={{ display: 'block', marginTop: '15px', color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
                    Volver al Login
                </Link>
            </div>
        </div>
    );
}