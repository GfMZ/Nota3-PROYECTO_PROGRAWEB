import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; 
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    setMensaje(""); 

    if (!correo || !contra) {
      setMensaje("Complete todos los campos");
      return;
    }
    const result = login(correo, contra);

    if (result.success) {
      navigate('/'); 
    } else {
      setMensaje(result.message);
    }
  };

  return (
    <div className="gp-login-container">
      <div className="gp-login-box">
        <h2 className="gp-login-title">Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="gp-form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="usuario@demo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="gp-form-group">
            <label htmlFor="contra">Contraseña</label>
            <input
              id="contra"
              type="password"
              placeholder="123456"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
            />
          </div>
          <button type="submit" className="gp-btn-login"> 
            Entrar
          </button>
        </form>

        <div className="gp-login-links">
          <a href="#">¿No tienes cuenta? Regístrate</a>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        {mensaje && (
          <div className="text-center mt-3 text-muted">{mensaje}</div>
        )}

      </div>
    </div>
  );
};

export default Login;