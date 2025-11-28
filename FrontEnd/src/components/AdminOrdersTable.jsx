import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchAllOrdersAdmin } from '../services/adminService';
import { Link } from 'react-router-dom';


const cardStyles = {
    container: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" },
    card: { backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", textAlign: "center", transition: "transform 0.2s ease" },
    cardTitle: { fontSize: "14px", color: "#666", marginBottom: "8px", textTransform: "uppercase" },
    cardValue: { fontSize: "22px", fontWeight: "bold", color: "#222" },
};

const theme = {
    green: '#2e9b1f', greenDark: '#227a17', blue: '#3b82f6', white: '#ffffff',
    gray50: '#f9fafb', gray100: '#f3f4f6', gray200: '#e5e7eb', gray300: '#d1d5db',
    gray600: '#4b5563', gray800: '#1f2937',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
};

const styles = {
    wrapper: { backgroundColor: theme.white, padding: '24px', borderRadius: '12px', boxShadow: theme.shadowMd, border: `1px solid ${theme.gray200}`, width: '100%', maxWidth: '100%', boxSizing: 'border-box' },
    title: { fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: theme.gray800 },
    tableWrapper: { overflowX: 'auto' },
    table: { minWidth: '100%', width: '100%', borderCollapse: 'collapse', fontSize: '14px', border: `1px solid ${theme.gray200}`, borderRadius: '8px', overflow: 'hidden' },
    tableHeader: { backgroundColor: theme.gray50, borderBottom: `1px solid ${theme.gray200}` },
    th: { padding: '12px 24px', textAlign: 'left', fontSize: '10px', fontWeight: 600, color: theme.gray600, textTransform: 'uppercase', letterSpacing: '0.05em' },
    thCenter: { textAlign: 'center' },
    tr: { backgroundColor: theme.white, borderBottom: `1px solid ${theme.gray200}`, transition: 'background-color 150ms ease' },
    trHover: { backgroundColor: theme.gray50 },
    td: { padding: '16px 24px', whiteSpace: 'nowrap', color: theme.gray800, border: 'none' },
    idLink: { color: theme.green, fontWeight: 700, textDecoration: 'none', transition: 'color 150ms ease' },
    idLinkHover: { color: theme.greenDark },
    totalText: { fontWeight: 700, color: theme.gray800 },
    actionCenter: { textAlign: 'center' },
    actionButton: { backgroundColor: theme.green, color: theme.white, padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, transition: 'background-color 150ms ease, box-shadow 150ms ease', border: 'none', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)' },
    actionButtonHover: { backgroundColor: theme.greenDark },
    paginationWrapper: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px', gap: '8px' },
    navButton: { padding: '8px', color: theme.gray600, transition: 'color 150ms ease', cursor: 'pointer', border: 'none', backgroundColor: 'transparent' },
    navButtonHover: { color: theme.gray800 },
    navButtonDisabled: { opacity: 0.5, cursor: 'default' },
    pageButton: { width: '32px', height: '32px', borderRadius: '50%', fontWeight: 700, transition: 'all 150ms ease', border: `1px solid ${theme.gray300}`, backgroundColor: theme.white, color: theme.gray700, cursor: 'pointer' },
    pageButtonActive: { backgroundColor: theme.green, color: theme.white, boxShadow: theme.shadowMd, border: 'none' },
    pageButtonHover: { backgroundColor: theme.gray100 },
    pageEllipsis: { cursor: 'default', opacity: 0.5, border: 'none', backgroundColor: 'transparent', padding: '0 4px' }
};


export default function AdminOrdersTable() {
    const { getAuthHeader, user } = useAuth();
    const isAdmin = user && user.role === 'admin'; 
    
    const [orders, setOrders] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    
    // Lógica para obtener TODAS las órdenes del API
    const fetchOrders = useCallback(async () => {
        if (!isAdmin) {
            setIsLoading(false);
            setError('Acceso denegado: No tienes permisos de administrador.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchAllOrdersAdmin(getAuthHeader()); 
            setOrders(data);
        } catch (err) {
            setError(err.message || 'Error al cargar las órdenes del administrador.');
            setOrders([]); 
        } finally {
            setIsLoading(false);
        }
    }, [getAuthHeader, isAdmin]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]); 

    // Cálculo de estadísticas
    const totalVentas = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const productosVendidos = orders.reduce((sum, order) => sum + order.orderItems.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const usuariosConCompras = new Set(orders.map(order => order.user ? order.user.email : 'unknown')).size; 
    
    const statsData = [
        { title: "Total de Ventas (S/.)", value: totalVentas.toFixed(2) },
        { title: "Productos Vendidos", value: productosVendidos },
        { title: "Usuarios con Compras", value: usuariosConCompras },
    ];
    
    const handlePageChange = (page) => {
        if (typeof page === 'number' && page >= 1 && page <= 10) setCurrentPage(page);
    };
    
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    
    if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;
    if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando datos de administración...</div>;
    
    if (orders.length === 0 && isAdmin) {
        return (
            <div>
                <div style={cardStyles.container}>
                    {statsData.map((item, index) => (
                        <div key={index} style={cardStyles.card}>
                            <div style={cardStyles.cardTitle}>{item.title}</div>
                            <div style={cardStyles.cardValue}>{item.value}</div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', padding: '2rem' }}>El sistema no tiene órdenes registradas.</div>
            </div>
        );
    }

    return (
        <div>
            <div style={cardStyles.container}>
                {statsData.map((item, index) => (
                    <div
                        key={index}
                        style={cardStyles.card}
                        onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1.0)"; }}
                    >
                        <div style={cardStyles.cardTitle}>{item.title}</div>
                        <div style={cardStyles.cardValue}>
                            {item.title.includes("S/.") ? `S/ ${item.value}` : item.value}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.wrapper}>
                <h2 style={styles.title}>Listado de Órdenes ({orders.length})</h2>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.th}>#ID</th>
                                <th style={styles.th}>Fecha</th>
                                <th style={styles.th}>Cliente</th>
                                <th style={styles.th}>Total</th>
                                <th style={{ ...styles.th, ...styles.thCenter }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const rowStyle = { ...styles.tr, ...(hoveredRow === index ? styles.trHover : {}) };
                                const date = new Date(order.createdAt).toLocaleDateString();
                                const orderIdDisplay = order._id.slice(-6).toUpperCase();
                                const clientName = order.user ? (order.user.name || order.user.email) : "Desconocido";

                                return (
                                    <tr key={order._id} style={rowStyle} onMouseOver={() => setHoveredRow(index)} onMouseOut={() => setHoveredRow(null)}>
                                        <td style={styles.td}>
                                            <Link to={`/orden/detalles/${order._id}`} style={{ ...styles.idLink, ...(hoveredLink === `id-${index}` ? styles.idLinkHover : {}) }} onMouseOver={() => setHoveredLink(`id-${index}`)} onMouseOut={() => setHoveredLink(null)}>
                                                {orderIdDisplay}
                                            </Link>
                                        </td>
                                        <td style={styles.td}>{date}</td>
                                        <td style={styles.td}>{clientName}</td>
                                        <td style={{ ...styles.td, ...styles.totalText }}>S/ {order.totalPrice.toFixed(2)}</td>
                                        <td style={{ ...styles.td, ...styles.actionCenter }}>
                                            <Link to={`/orden/detalles/${order._id}`}>
                                                <button style={styles.actionButton}>Ver detalle</button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}