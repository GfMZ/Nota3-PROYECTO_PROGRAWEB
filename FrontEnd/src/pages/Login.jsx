import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; 
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Importamos 'Link' para la navegación
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const [cargando, setCargando] = useState(false); // Estado de carga visual
  
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
    
    // Esperar la respuesta del backend
    const result = await login(correo, contra);

    setCargando(false);

    if (result.success) {
      navigate('/'); // Redirigir al Home si es exitoso
    } else {
      setMensaje(result.message); // Mostrar error del backend
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
          {/* Enlace para Crear Cuenta */}
          <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
          
          {/* 🛑 ENLACE AÑADIDO: OLVIDÉ MI CONTRASEÑA 🛑 */}
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
          {/* ------------------------------------------- */}
        </div>
        {mensaje && (
          <div className="text-center mt-3 text-danger">{mensaje}</div>
        )}

      </div>
    </div>
  );
};

export default Login;