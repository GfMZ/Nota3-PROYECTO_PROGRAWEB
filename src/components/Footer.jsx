import React from 'react';

export default function Footer() {
  return (
    <footer className="gp-footer">
      <div className="footer-top">
        <div className="col">
          <h4>Síguenos</h4>
          <p>Facebook • X • Instagram • YouTube</p>
        </div>
        <div className="col">
          <h4>Nosotros</h4>
          <ul><li>Conócenos</li><li>Responsabilidad social</li><li>Nuestras tiendas</li></ul>
        </div>
        <div className="col">
          <h4>Atención al cliente</h4>
          <ul><li>Atención al cliente</li><li>Horarios</li><li>Preguntas frecuentes</li></ul>
        </div>
        <div className="col">
          <h4>Políticas y condiciones</h4>
          <ul><li>Políticas de datos personales</li><li>Condición de promociones</li><li>Términos y condiciones</li></ul>
        </div>
      </div>

      <div className="footer-bottom">© {new Date().getFullYear()} GamePlay</div>
    </footer>
  );
}
