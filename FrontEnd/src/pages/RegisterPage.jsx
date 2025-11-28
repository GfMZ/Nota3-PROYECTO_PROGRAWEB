import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Importamos el contexto

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [repContra, setRepContra] = useState("");
  const [pais, setPais] = useState("");
  
  // Estados para manejo de UI
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { register } = useAuth(); // 2. Sacamos la función de registro real
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    // Es importante prevenir el comportamiento por defecto si está en un form
    if (e) e.preventDefault(); 

    // --- Validaciones Locales ---
    if (!nombre || !correo || !contra || !repContra || !pais) {
      setMensaje("Llene todos los campos antes de continuar.");
      setEsError(true);
      return;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Ingrese un correo válido.");
      setEsError(true);
      return;
    }
    if (contra !== repContra) {
      setMensaje("Las contraseñas deben coincidir.");
      setEsError(true);
      return;
    }

    // --- Llamada al Backend ---
    setCargando(true);
    setMensaje(""); // Limpiar mensajes previos

    // Llamamos a la función register del AuthContext
    // Esta función llama al authService -> API -> Backend MongoDB
    const resultado = await register(nombre, correo, contra, pais);

    setCargando(false);

    if (resultado.success) {
      // ÉXITO
      setEsError(false);
      setMensaje("✅ ¡Registro exitoso! Redirigiendo...");
      
      // Esperamos 1.5 segundos y redirigimos al Home (ya logueado)
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      // ERROR (Ej: "El usuario ya existe")
      setEsError(true);
      setMensaje(`❌ ${resultado.message}`);
    }
  };

  return (
    <div className="gp-login-container">
      <div className="gp-login-box">
        <h2 className="gp-login-title">Registro</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Crea tu cuenta en GamePlay</p>
        
        <form onSubmit={handleRegister}>
            <div className="gp-form-group">
            <label htmlFor="nombreRegis">Nombres</label>
            <input id="nombreRegis" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={cargando} />
            </div>
            <div className="gp-form-group">
            <label htmlFor="emailRegis">Correo</label>
            <input id="emailRegis" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} disabled={cargando} />
            </div>
            <div className="gp-form-group">
            <label htmlFor="paisRegis">País de residencia</label>
            <input id="paisRegis" type="text" value={pais} onChange={(e) => setPais(e.target.value)} disabled={cargando} />
            </div>
            <div className="gp-form-group">
            <label htmlFor="contraRegis">Contraseña</label>
            <input id="contraRegis" type="password" value={contra} onChange={(e) => setContra(e.target.value)} disabled={cargando} />
            </div>
            <div className="gp-form-group">
            <label htmlFor="repContraRegis">Repetir contraseña</label>
            <input id="repContraRegis" type="password" value={repContra} onChange={(e) => setRepContra(e.target.value)} disabled={cargando} />
            </div>
            
            <button 
                type="submit" 
                className="gp-btn-login" 
                disabled={cargando}
                style={{ opacity: cargando ? 0.7 : 1 }}
            >
                {cargando ? 'Registrando...' : 'Registrar'}
            </button>
        </form>

        {mensaje && (
          <p style={{ 
              backgroundColor: esError ? '#FEE2E2' : '#D1FAE5', 
              color: esError ? '#B91C1C' : '#047857', 
              padding: '10px', 
              borderRadius: '8px', 
              marginTop: '15px', 
              textAlign: 'center' 
          }}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}