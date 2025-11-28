import React from 'react';
import SideMenu from '../components/SideMenu';
import AdminOrdersTable from '../components/AdminOrdersTable'; // Importamos la tabla que ya arreglamos
import { useAuth } from '../context/AuthContext';

export default function AdminOrdersPage() {
    const { user } = useAuth();
    const isAdmin = user && user.role === 'admin';

    // Estilos para el layout (mismos que en ProductListAdmin y CategoryListAdmin)
    const styles = {
        container: { 
            display: 'flex', 
            minHeight: '100vh', 
            backgroundColor: '#F0F2F5' 
        },
        content: { 
            flex: 1, 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column',
            overflowY: 'auto' // Para que el contenido tenga scroll si es muy largo
        },
        header: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937'
        }
    };

    if (!isAdmin) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Acceso denegado: Solo administradores.</div>;
    }

    return (
        <div style={styles.container}>
            {/* Menú Lateral */}
            <SideMenu />
            
            {/* Contenido Principal */}
            <div style={styles.content}>
                <h1 style={styles.header}>Gestión de Órdenes</h1>
                
                {/* Aquí renderizamos el componente que ya conectamos a la API */}
                <AdminOrdersTable />
            </div>
        </div>
    );
}