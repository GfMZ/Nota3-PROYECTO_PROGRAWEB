import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import logoGamePlace from '../img/LogotipoGamePlace.png';

export default function Header() {
  return (
    <header className="gp-header">
      <div className="gp-top">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="gp-logo">
            <img src={logoGamePlace} alt="Logo de GamePlace" style={{ height: '80px', display: 'block' }} />
          </div>
        </Link>
        <div className="gp-search">
          <input type="search" placeholder="Buscar un producto..." aria-label="Buscar" />
          <button className="search-btn" aria-label="Buscar">🔍</button>
        </div>
        <div className="gp-actions">
          <CartWidget />
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
          <li><Link to="/admin/categorias" style={{ textDecoration: 'none', color: 'inherit' }}>Categorías</Link></li>
          <li><Link to="/productos" style={{ textDecoration: 'none', color: 'inherit' }}>Productos</Link></li>
          <li><Link to="/nosotros" style={{ textDecoration: 'none', color: 'inherit' }}>Nosotros</Link></li>
          <li className="offers"><Link to="/ofertas" style={{ textDecoration: 'none', color: 'inherit' }}>OFERTAS</Link></li>
        </ul>
      </nav>
    </header>
  );
}