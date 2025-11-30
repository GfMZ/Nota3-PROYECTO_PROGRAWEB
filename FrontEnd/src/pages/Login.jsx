import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; 
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const [cargando, setCargando] = useState(false); 
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setMensaje(""); 

    if (!correo || !contra) {
      setMensaje("Complete todos los campos");
      return;
    }

    setCargando(true);
    
    
    const result = await login(correo, contra);

    setCargando(false);

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
              disabled={cargando}
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
              disabled={cargando}
            />
          </div>
          <button 
            type="submit" 
            className="gp-btn-login"
            disabled={cargando}
            style={{ opacity: cargando ? 0.7 : 1 }}
          > 
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="gp-login-links">

          <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
          

          <Link 
            to="/forgot-password" 
            style={{ 
              color: '#999', 
              textDecoration: 'none', 
              fontSize: '14px' 
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          
        </div>
        {mensaje && (
          <div className="text-center mt-3 text-danger">{mensaje}</div>
        )}

      </div>
    </div>
  );
};

export default Login;