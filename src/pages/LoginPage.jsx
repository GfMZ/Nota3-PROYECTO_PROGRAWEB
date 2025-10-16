import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/usuario'); 
  };

  return (
    <div className="gp-login-container">
      <div className="gp-login-box">
        <h2 className="gp-login-title">Iniciar Sesión</h2>
        <div className="gp-form-group">
          <label htmlFor="correo">Correo electrónico</label>
          <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div className="gp-form-group">
          <label htmlFor="contra">Contraseña</label>
          <input id="contra" type="password" value={contra} onChange={(e) => setContra(e.target.value)} />
        </div>
        <button className="gp-btn-login" onClick={handleLogin}>Entrar</button>
        <div className="gp-login-links">
          <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}