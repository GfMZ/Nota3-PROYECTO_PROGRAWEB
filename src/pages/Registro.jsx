import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { useState } from "react";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [repContra, setRepContra] = useState("");
  const [pais, setPais] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correoEnviado, setCorreoEnviado] = useState(false);

  const onClick = () => {
    if (!nombre || !correo || !contra || !repContra || !pais) {
      setMensaje("Llene todos los campos antes de continuar.");
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Ingrese un correo válido.");
      return;
    }

    if (contra !== repContra) {
      setMensaje("Las contraseñas deben coincidir.");
      return;
    }

    setTimeout(() => {
      setMensaje("✅ ¡Registro exitoso! Revisa tu correo para activar tu cuenta.");
      setCorreoEnviado(true);
    }, 800);
  };

  return (
    <div className="gp-login-container">
      <div className="gp-login-box">
        <h2 className="gp-login-title text-center mb-3">
          Registro
        </h2>

        <p className="text-center mb-4">Ingresa los siguientes datos:</p>

        <div className="gp-form-group">
          <label htmlFor="nombreRegis">Nombres</label>
          <input
            id="nombreRegis"
            type="text"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="gp-form-group">
          <label htmlFor="emailRegis">Correo</label>
          <input
            id="emailRegis"
            type="email"
            placeholder="ejemplo@gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="gp-form-group">
          <label htmlFor="paisRegis">País de residencia</label>
          <input
            id="paisRegis"
            type="text"
            placeholder="Perú"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </div>

        <div className="gp-form-group">
          <label htmlFor="contraRegis">Contraseña</label>
          <input
            id="contraRegis"
            type="password"
            placeholder="******"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
          />
        </div>

        <div className="gp-form-group">
          <label htmlFor="repContraRegis">Repetir contraseña</label>
          <input
            id="repContraRegis"
            type="password"
            placeholder="******"
            value={repContra}
            onChange={(e) => setRepContra(e.target.value)}
          />
        </div>

        <button className="gp-btn-login" onClick={onClick}>
          Registrar
        </button>

        {mensaje && (
          <p
            style={{
              backgroundColor: correoEnviado
                ? "rgba(46,155,31,0.15)"
                : "rgba(255,0,0,0.1)",
              padding: "10px",
              borderRadius: "8px",
              color: correoEnviado ? "var(--green)" : "#f55",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default Registro;