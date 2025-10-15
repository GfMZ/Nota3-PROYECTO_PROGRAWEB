import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

// --- DEFINICIÓN DE TEMA LOCAL ---
const theme = {
    green: '#2e9b1f',
    dark: '#333',
    gray100: '#f3f4f6',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray800: '#1f2937',
    yellow300: '#fde047',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
};

// --- HeaderA Component (Con Estilos en Línea) ---
export default function HeaderA() {
    const styles = {
        wrapper: {
            boxShadow: theme.shadowMd,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: '#fff',
        },
        topBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            background: '#fff',
            padding: '0 40px',
            borderBottom: `1px solid ${theme.gray100}`,
            gap: '16px',
        },
        logo: {
            fontWeight: 700,
            fontSize: '24px',
            color: theme.green,
            marginRight: '32px',
        },
        dot: { color: theme.gray800, marginLeft: '4px' },
        searchContainer: {
            position: 'relative',
            flexGrow: 1,
            maxWidth: '600px',
        },
        searchInput: {
            width: '100%',
            padding: '8px 40px 8px 12px',
            border: `1px solid ${theme.gray300}`,
            borderRadius: '8px',
            fontSize: '14px',
        },
        searchIcon: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: theme.gray400,
        },
        actions: {
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '14px',
        },
        cartBtn: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            background: theme.green,
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            fontWeight: 600,
        },
        cartIcon: { marginRight: '8px' },
        userAction: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            cursor: 'pointer',
            color: theme.gray800,
        },
        userText: {
            color: theme.gray500,
            fontSize: '11px',
            marginTop: '-2px',
        },
        navBar: {
            height: '40px',
            background: theme.green,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            fontWeight: 600,
            fontSize: '14px',
        },
        navList: {
            display: 'flex',
            gap: '24px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            width: '100%',
            alignItems: 'center',
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
        },
        navItemIcon: { marginRight: '4px' },
        navLink: {
            color: '#fff',
            textDecoration: 'none',
        },
        navOffer: {
            marginLeft: 'auto',
            fontWeight: 700,
            color: theme.yellow300,
        },
    };

    return (
        <header style={styles.wrapper}>
            {/* Top Bar */}
            <div style={styles.topBar}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Logo */}
                    <div style={styles.logo}>
                        GamePlay <span style={styles.dot}>•</span>
                    </div>
                </div>
                
                {/* Search Bar */}
                <div style={styles.searchContainer}>
                    <input 
                        type="search" 
                        placeholder="Buscar un producto..." 
                        style={styles.searchInput}
                    />
                    <Search size={18} style={styles.searchIcon} />
                </div>

                {/* Actions */}
                <div style={styles.actions}>
                    {/* Cart Button */}
                    <div style={styles.cartBtn}>
                        <ShoppingCart size={20} style={styles.cartIcon} />
                        <span>Carrito S/ 00.00</span>
                    </div>
                    {/* User Button */}
                    <div style={styles.userAction}>
                        <div style={styles.userActionInner}>
                            <User size={18} style={styles.userIcon} /> Usuario
                        </div>
                        <small style={styles.userText}>Cuenta</small>
                    </div>
                </div>
            </div>
            
            {/* Nav Bar (Green) */}
            <nav style={styles.navBar}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}>
                        <Menu size={18} style={styles.navItemIcon} /> Categorías
                    </li>
                    <li style={styles.navItem}><a href="#" style={styles.navLink}>Productos</a></li>
                    <li style={styles.navItem}><a href="#" style={styles.navLink}>Nosotros</a></li>
                    <li style={styles.navOffer}>OFERTAS 🔥</li>
                </ul>
            </nav>
        </header>
    );
}
