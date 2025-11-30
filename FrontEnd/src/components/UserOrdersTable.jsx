import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

import { fetchMyOrders } from '../services/orderService'; 


const theme = {
    green: '#2e9b1f',
    greenDark: '#227a17',
    blue: '#3b82f6',
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray600: '#4b5563',
    gray800: '#1f2937',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
};

const styles = {
    wrapper: { backgroundColor: theme.white, padding: '24px', borderRadius: '12px', boxShadow: theme.shadowMd, border: `1px solid ${theme.gray200}`, width: '100%', maxWidth: '100%', boxSizing: 'border-box', },
    title: { fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: theme.gray800, },
    tableWrapper: { overflowX: 'auto', },
    table: { minWidth: '100%', width: '100%', borderCollapse: 'collapse', fontSize: '14px', border: `1px solid ${theme.gray200}`, borderRadius: '8px', overflow: 'hidden', },
    tableHeader: { backgroundColor: theme.gray50, borderBottom: `1px solid ${theme.gray200}`, },
    th: { padding: '12px 24px', textAlign: 'left', fontSize: '10px', fontWeight: 600, color: theme.gray600, textTransform: 'uppercase', letterSpacing: '0.05em', },
    thCenter: { textAlign: 'center', },
    tr: { backgroundColor: theme.white, borderBottom: `1px solid ${theme.gray200}`, transition: 'background-color 150ms ease', },
    trHover: { backgroundColor: theme.gray50, },
    td: { padding: '16px 24px', whiteSpace: 'nowrap', color: theme.gray800, border: 'none', },
    idLink: { color: theme.green, fontWeight: 700, textDecoration: 'none', transition: 'color 150ms ease', },
    idLinkHover: { color: theme.greenDark, },
    totalText: { fontWeight: 700, color: theme.gray800, },
    actionCenter: { textAlign: 'center', },
    actionButton: { backgroundColor: theme.green, color: theme.white, padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, transition: 'background-color 150ms ease, box-shadow 150ms ease', border: 'none', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)', },
    actionButtonHover: { backgroundColor: theme.greenDark, },
    paginationWrapper: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px', gap: '8px', },
    navButton: { padding: '8px', color: theme.gray600, transition: 'color 150ms ease', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', },
    navButtonHover: { color: theme.gray800, },
    navButtonDisabled: { opacity: 0.5, cursor: 'default', },
    pageButton: { width: '32px', height: '32px', borderRadius: '50%', fontWeight: 700, transition: 'all 150ms ease', border: `1px solid ${theme.gray300}`, backgroundColor: theme.white, color: theme.gray700, cursor: 'pointer', },
    pageButtonActive: { backgroundColor: theme.green, color: theme.white, boxShadow: theme.shadowMd, border: 'none', },
    pageButtonHover: { backgroundColor: theme.gray100, },
    pageEllipsis: { cursor: 'default', opacity: 0.5, border: 'none', backgroundColor: 'transparent', padding: '0 4px', }
};

export default function UserOrdersTable() {
    // ... (Hooks y lógica se mantienen igual) ...
    const { getAuthHeader, user } = useAuth(); 
    const [orders, setOrders] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    // ... (loadOrders y useEffect se mantienen igual) ...
    const loadOrders = useCallback(async () => {
        if (!user) { setIsLoading(false); return; }
        setIsLoading(true);
        try {
            const data = await fetchMyOrders(getAuthHeader());
            setOrders(data);
        } catch (error) { console.error("Error:", error); } 
        finally { setIsLoading(false); }
    }, [user, getAuthHeader]);

    useEffect(() => { loadOrders(); }, [loadOrders]);
    
    // ... (Renderizado de carga y vacío igual) ...

    if (isLoading) return <div style={{padding:'24px', textAlign:'center'}}>Cargando...</div>;
    if (orders.length === 0) return <div style={{padding:'24px', textAlign:'center'}}>No tienes órdenes.</div>;

    return (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Mis Órdenes ({orders.length})</h2>
            
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px' }}>#ID</th>
                            <th style={{ padding: '12px' }}>Fecha</th>
                            <th style={{ padding: '12px' }}>Estado</th> 
                            <th style={{ padding: '12px' }}>Total</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const date = new Date(order.createdAt).toLocaleDateString();
                            
                            // --- CORRECCIÓN AQUÍ ---
                            // Convertimos a String explícitamente antes de hacer slice
                            // Si el ID es 15, String(15) es "15", y el slice funciona.
                            const idStr = String(order._id || order.id);
                            const displayId = idStr.length > 6 ? idStr.slice(-6).toUpperCase() : idStr; 
                            
                            const status = order.isPaid ? 'Pagado' : 'Pendiente';
                            
                            return (
                                <tr key={order._id || order.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '16px' }}>
                                        <Link to={`/orden/detalles/${order._id || order.id}`} style={{ fontWeight: 'bold', color: '#2e9b1f', textDecoration:'none' }}>
                                            #{displayId}
                                        </Link>
                                    </td>
                                    <td style={{ padding: '16px' }}>{date}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ color: order.isPaid ? '#2e9b1f' : '#f59e0b', fontWeight: 'bold' }}>
                                            {status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight:'bold' }}>S/ {order.totalPrice.toFixed(2)}</td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <Link to={`/orden/detalles/${order._id || order.id}`}>
                                            <button style={{ backgroundColor: '#2e9b1f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor:'pointer' }}>
                                                Ver detalle
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}