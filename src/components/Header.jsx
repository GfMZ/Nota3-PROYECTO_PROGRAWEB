
import React from 'react';

export default function Header() {
  return (
    <header className="gp-header">
      <div className="gp-top">
        <div className="gp-logo">GamePlay <span className="dot">•</span></div>

        <div className="gp-search">
          <input type="search" placeholder="Buscar un producto..." aria-label="Buscar" />
          <button className="search-btn" aria-label="Buscar">🔍</button>
        </div>

        <div className="gp-actions">
          <div className="gp-cart" aria-hidden>
            <div>Carrito</div>
            <div className="cart-amount">S/ 100.00</div>
          </div>
          <div className="gp-user" aria-hidden>
            <div>Usuario</div>
            <small>cuenta</small>
          </div>
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
