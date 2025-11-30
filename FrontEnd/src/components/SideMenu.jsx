import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { fetchCategories } from '../services/productService'; 

// Definiciones de estilos
const menuContainerStyles = {
    width: '200px',
    backgroundColor: '#F5F5F5',
    paddingTop: '20px',
    borderRight: '1px solid #E0E0E0',
    fontFamily: 'Arial, sans-serif',
    height: 'calc(100vh - 60px)',
    boxSizing: 'border-box',
    position: 'sticky', 
    top: '60px'
};

const menuItemStyles = {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '5px',
    fontSize: '14px',
    transition: 'background-color 0.2s',
};

const activeMenuItemStyles = {
    ...menuItemStyles,
    backgroundColor: '#E0E0E0',
    fontWeight: 'bold',
    color: '#2e9b1f' 
};

const categoryIconStyles = {
    width: '18px',
    height: '18px',
    marginRight: '10px',
    display: 'inline-block'
};

const SideMenu = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation(); 

    // obtener categorías del API
    const loadCategories = useCallback(async () => {
        try {
            const data = await fetchCategories();
            setCategories(data); 
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    
    const getMenuItemStyle = (path) => {
        
        return location.pathname === path ? activeMenuItemStyles : menuItemStyles;
    };
    
    if (isLoading) {
        return <div style={{ ...menuContainerStyles, textAlign: 'center', padding: '40px 0', color: '#666' }}>Cargando menú...</div>;
    }

    return (
        <div style={menuContainerStyles}>
            
            <h4 style={{ padding: '0 20px 10px', margin: 0, color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>
                Administración
            </h4>

            {/* ENLACES PRINCIPALES */}
            <Link to="/admin/categorias" style={getMenuItemStyle('/admin/categorias')}>
                 <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Categorías
            </Link>
            
            <Link to="/admin/productos" style={getMenuItemStyle('/admin/productos')}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5 10h10zm0 20l-5-10h10z"/></svg>
                Productos
            </Link>
            
            <Link to="/admin/ordenes" style={getMenuItemStyle('/admin/ordenes')}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                Órdenes
            </Link>
            
            {/* 🛑 ENLACE AÑADIDO: USUARIOS 🛑 */}
            <Link to="/admin/usuarios" style={getMenuItemStyle('/admin/usuarios')}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Usuarios
            </Link>
            {/* ---------------------------------- */}

            <div style={{...menuItemStyles, cursor: 'default', opacity: 0.5}}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107"><path d="M20.5 4.5l-2.79 2.79-4.21-4.21-2.79 2.79L10 2l-8 8 2 2 8-8 8 8 2-2-8-8 8-8z"/></svg>
                Ofertas (Próx.)
            </div>
            
            
            <h4 style={{ padding: '15px 20px 5px', margin: 0, color: '#888', fontSize: '12px', textTransform: 'uppercase', borderTop: '1px solid #e0e0e0', marginTop: '10px' }}>
                Vista Pública
            </h4>
            
            
            <div style={{ padding: '5px 0 20px 0' }}>
                {categories.map((cat) => (
                    <Link 
                        key={cat._id} 
                        to={`/search?category=${encodeURIComponent(cat.name)}`} 
                        style={{ ...menuItemStyles, paddingLeft: '30px', fontSize: '13px' }}
                    >
                        • {cat.name}
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default SideMenu;