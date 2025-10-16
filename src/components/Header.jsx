import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartWidget from './CartWidget';
import logoGamePlace from '../img/LogotipoGamePlace.jpg';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <header className="gp-header">
      <div className="gp-top">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="gp-logo">
            <img src={logoGamePlace} alt="Logo de GamePlace" style={{ height: '80px', display: 'block' }} />
          </div>
        </Link>
        <form className="gp-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Buscar por producto, serie o marca..."
            aria-label="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Buscar">🔍</button>
        </form>
        <div className="gp-actions">
          <CartWidget />
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
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