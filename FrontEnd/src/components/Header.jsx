import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartWidget from './CartWidget';
import logoGamePlace from '../img/LogotipoGamePlace.jpg';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

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
          
          {user ? (
            <div className="gp-user" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <Link to="/usuario" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                <div>Hola, {user.name}</div>
              </Link>
              <small>
                <button 
                  onClick={logout} 
                  style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px', color: '#666' }}
                >
                  Cerrar Sesión
                </button>
              </small>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="gp-user" aria-hidden>
                <div>Usuario</div>
                <small>Ingresar</small>
              </div>
            </Link>
          )}
        </div>
      </div>

      <nav className="gp-nav" aria-label="Navegación principal">
        <ul>
          
          {user && user.role === 'admin' ? (
             <li>
               <Link to="/admin/categorias" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#ffeb3b' }}>
                 ⚙️ ADMINISTRACIÓN
               </Link>
             </li>
          ) : (
             <li><Link to="/productos" style={{ textDecoration: 'none', color: 'inherit' }}>Explorar</Link></li>
          )}

          <li><Link to="/productos" style={{ textDecoration: 'none', color: 'inherit' }}>Productos</Link></li>
          <li><Link to="/nosotros" style={{ textDecoration: 'none', color: 'inherit' }}>Nosotros</Link></li>
          <li className="offers"><Link to="/ofertas" style={{ textDecoration: 'none', color: 'inherit' }}>OFERTAS</Link></li>
        </ul>
      </nav>
    </header>
  );
}