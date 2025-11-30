// frontend/src/components/AdminUsersTable.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUsers, updateBlockStatus } from '../services/adminService';

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '20px' },
    th: { padding: '12px', textAlign: 'left', backgroundColor: '#f9fafb' },
    td: { padding: '12px', borderBottom: '1px solid #eee' },
    btnBlock: { backgroundColor: '#dc2626', color: 'white', padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' },
    btnUnblock: { backgroundColor: '#10b981', color: 'white', padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' },
    status: { fontWeight: 'bold' }
};

export default function AdminUsersTable() {
    const { getAuthHeader, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchUsers(getAuthHeader());
            setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        } finally {
            setIsLoading(false);
        }
    }, [getAuthHeader]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleBlockToggle = async (userId, currentStatus) => {
        if (!window.confirm(`¿Está seguro de que desea ${currentStatus ? 'DESBLOQUEAR' : 'BLOQUEAR'} a este usuario?`)) {
            return;
        }

        try {
            await updateBlockStatus(userId, !currentStatus, getAuthHeader());
            loadUsers(); // Recargar la lista para actualizar la tabla
        } catch (error) {
            alert(error.message);
        }
    };

    if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando usuarios...</div>;

    return (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Listado de Usuarios ({users.length})</h3>
            
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>#ID</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Rol</th>
                        <th style={styles.th}>Estado</th>
                        <th style={styles.th}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td style={styles.td}>{u._id}</td>
                            <td style={styles.td}>{u.name}</td>
                            <td style={styles.td}>{u.email}</td>
                            <td style={styles.td}>{u.role}</td>
                            <td style={styles.td}>
                                <span style={{ ...styles.status, color: u.isBlocked ? '#dc2626' : '#10b981' }}>
                                    {u.isBlocked ? 'BLOQUEADO' : 'ACTIVO'}
                                </span>
                            </td>
                            <td style={styles.td}>
                                {u.role !== 'admin' && ( // Evitar el botón de bloqueo para administradores
                                    <button
                                        style={u.isBlocked ? styles.btnUnblock : styles.btnBlock}
                                        onClick={() => handleBlockToggle(u._id, u.isBlocked)}
                                    >
                                        {u.isBlocked ? 'DESBLOQUEAR' : 'BLOQUEAR'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}