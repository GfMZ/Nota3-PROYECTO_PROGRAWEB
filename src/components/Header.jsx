
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="gp-header">
      <div className="gp-top">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="gp-logo">GamePlay <span className="dot">•</span></div>
        </Link>

        <div className="gp-search">
          <input type="search" placeholder="Buscar un producto..." aria-label="Buscar" />
          <button className="search-btn" aria-label="Buscar">🔍</button>
        </div>

        <div className="gp-actions">
          <div className="gp-cart" aria-hidden>
            <div>Carrito</div>
            <div className="cart-amount">S/ 100.00</div>
          </div>
          <Link to="/usuario" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="gp-user" aria-hidden>
              <div>Usuario</div>
              <small>cuenta</small>
            </div>
          </Link>
        </div>
      </div>

      <nav className="gp-nav" aria-label="Navegación principal">
        <ul>
          <li>Categorías</li>
          <li>Productos</li>
          <li>Nosotros</li>
          <li className="offers">OFERTAS </li>
        </ul>
      </nav>
    </header>
  );
}
