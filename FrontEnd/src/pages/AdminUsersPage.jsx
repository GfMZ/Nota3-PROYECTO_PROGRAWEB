// frontend/src/pages/AdminUsersPage.jsx

import React from 'react';
import SideMenu from '../components/SideMenu';
import AdminUsersTable from '../components/AdminUsersTable';

const styles = {
    container: { display: 'flex', minHeight: '100vh', background: '#F0F2F5' },
    content: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
    header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }
};

export default function AdminUsersPage() {
    // Ya que esta página solo es accesible vía /admin, asumimos que el usuario es admin
    
    return (
        <div style={styles.container}>
            <SideMenu />
            <div style={styles.content}>
                <h1 style={styles.header}>Gestión de Usuarios</h1>
                <AdminUsersTable />
            </div>
        </div>
    );
}