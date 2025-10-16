
import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    const menuContainerStyles = {
        width: '200px',
        backgroundColor: '#F5F5F5',
        paddingTop: '20px',
        borderRight: '1px solid #E0E0E0',
        fontFamily: 'Arial, sans-serif',
        height: 'calc(100vh - 60px)',
        boxSizing: 'border-box'
    };

    const menuItemStyles = {
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        color: '#333',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const activeMenuItemStyles = {
        ...menuItemStyles,
        backgroundColor: '#E0E0E0',
        fontWeight: 'bold'
    };

    const categoryIconStyles = {
        width: '18px',
        height: '18px',
        marginRight: '10px',
        display: 'inline-block'
    };

    return (
        <div style={menuContainerStyles}>
            <Link to="/admin/categorias" style={activeMenuItemStyles}>
                 <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Categorías
            </Link>
            <div style={menuItemStyles}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5 10h10zm0 20l-5-10h10z"/></svg>
                Productos
            </div>
            <div style={menuItemStyles}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                Nosotros
            </div>
            <div style={menuItemStyles}>
                <svg style={categoryIconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107"><path d="M20.5 4.5l-2.79 2.79-4.21-4.21-2.79 2.79L10 2l-8 8 2 2 8-8 8 8 2-2-8-8 8-8z"/></svg>
                Ofertas <span style={{marginLeft: '5px'}}>💰</span>
            </div>
        </div>
    );
};

export default SideMenu;