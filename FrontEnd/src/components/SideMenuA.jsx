import React from 'react';
import { User as UserIcon, List, Tag, Settings } from 'lucide-react';

const theme = {
    green: '#2e9b1f',
    greenLight: '#f0fdf4', 
    dark: '#333',
    gray700: '#374151',
    gray100: '#f3f4f6',
    gray800: '#1f2937',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export default function SideMenuA({ activeTab, onTabChange }) {

    const getLinkStyle = (tabName) => {
        const isActive = activeTab === tabName;
        
        
        const baseStyle = {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            borderLeft: '4px solid transparent',
            transition: 'all 0.15s ease-in-out',
            fontWeight: '600',
        };

        if (isActive) {
            return {
                ...baseStyle,
                fontWeight: '700',
                color: theme.green,
                borderLeftColor: theme.green,
                backgroundColor: theme.greenLight, 
            };
        }

        return {
            ...baseStyle,
            color: theme.gray700,
            borderLeftColor: 'transparent',
            ':hover': { 
                backgroundColor: theme.gray100,
                color: theme.green,
            },
        };
    };

    const styles = {
        container: {
            width: '256px', 
            minWidth: '256px', 
            backgroundColor: 'white',
            boxShadow: theme.shadowXl,
            paddingTop: '32px', 
            height: 'fit-content', 
            position: 'sticky',
            top: '96px', 
            borderRadius: '8px', 
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            padding: '0 20px 16px', 
            color: theme.gray800,
            borderBottom: `1px solid ${theme.gray100}`,
            marginBottom: '0',
        },
        nav: {
            marginTop: '16px', 
            paddingBottom: '20px',
        },
        linkIcon: {
            marginRight: '12px', 
        }
    };

    
    const navItems = [
        { name: 'Detalles de Usuario', icon: UserIcon, tab: 'details' },
        { name: 'Mis Órdenes', icon: List, tab: 'orders' },
        { name: 'Cupones y Descuentos', icon: Tag, tab: 'coupons' },
        { name: 'Configuración', icon: Settings, tab: 'settings' },
    ];

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>
                Menú de Cuenta
            </h3>
            
            <nav style={styles.nav}>
                {navItems.map((item) => {
                    const Icon = item.icon; 
                    return (
                        <div 
                            key={item.tab}
                            style={getLinkStyle(item.tab)}
                            onClick={() => onTabChange(item.tab)}
                        >
                            <Icon size={18} style={styles.linkIcon} /> {item.name}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}