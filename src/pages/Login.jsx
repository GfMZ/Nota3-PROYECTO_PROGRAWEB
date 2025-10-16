import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; 
import { useState } from "react";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [logueado, setLogueado] = useState(false);

  const handleLogin = () => {
    if (!correo || !contra) {
      setMensaje("Complete todos los campos");
      return;
    }

    const usuarioDemo = {
      correo: "usuario@demo.com",
      contra: "123456",
    };

    if (correo === usuarioDemo.correo && contra === usuarioDemo.contra) {
      setLogueado(true);
      setMensaje("Inicio de sesión exitoso ✅");
    } else {
      setMensaje("Correo o contraseña incorrectos ❌");
    }
  };

  const handleLogout = () => {
    setLogueado(false);
    setCorreo("");
    setContra("");
    setMensaje("");
  };

  return (
    <div className="gp-login-container">
      <div className="gp-login-box">
        {!logueado ? (
          <>
            <h2 className="gp-login-title">Iniciar Sesión</h2>

            <div className="gp-form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                type="email"
                placeholder="ejemplo@demo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="gp-form-group">
              <label htmlFor="contra">Contraseña</label>
              <input
                id="contra"
                type="password"
                placeholder="******"
                value={contra}
                onChange={(e) => setContra(e.target.value)}
              />
            </div>

            <button className="gp-btn-login" onClick={handleLogin}>
              Entrar
            </button>

            <div className="gp-login-links">
              <a href="#">¿No tienes cuenta? Regístrate</a>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="text-center mt-3 text-muted">{mensaje}</div>
          </>
        ) : (
          <div className="text-center">
            <h3 style={{ color: "var(--green)" }}>Bienvenido 👋</h3>
            <p>{correo}</p>
            <button className="btn btn-outline-success" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;