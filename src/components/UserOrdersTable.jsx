import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- DEFINICIÓN DE TEMA LOCAL ---
const theme = {
    green: '#2e9b1f',
    greenDark: '#227a17',
    blue: '#3b82f6', // Usado para enlaces de ID
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray600: '#4b5563',
    gray800: '#1f2937',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
};

// --- Definición de Estilos (Objetos JS) ---
const styles = {
    // Contenedor Principal
    wrapper: {
    backgroundColor: theme.white,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: theme.shadowMd,
    border: `1px solid ${theme.gray200}`,
    width: '100%',
    maxWidth: '100%',     // evita que se desborde horizontalmente
    boxSizing: 'border-box', // incluye los bordes y padding en el ancho total
},

    title: {
        fontSize: '24px', // text-2xl
        fontWeight: 700, // font-bold
        marginBottom: '20px', // mb-5
        color: theme.gray800,
    },
    // Contenedor de la Tabla (para scroll horizontal en móvil)
    tableWrapper: {
        overflowX: 'auto',
        // Asegura que la tabla no tenga padding lateral y se extienda al 100%
    },
    table: {
        minWidth: '100%',
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px', // text-sm
        border: `1px solid ${theme.gray200}`,
        borderRadius: '8px',
        overflow: 'hidden', // Para que el border radius aplique bien
    },
    // Encabezado de la Tabla (<thead>)
    tableHeader: {
        backgroundColor: theme.gray50,
        borderBottom: `1px solid ${theme.gray200}`,
    },
    th: {
        padding: '12px 24px', // px-6 py-3
        textAlign: 'left',
        fontSize: '10px', // text-xs
        fontWeight: 600, // font-medium
        color: theme.gray600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em', // tracking-wider
    },
    thCenter: {
        textAlign: 'center',
    },
    // Cuerpo de la Tabla (<tbody>)
    tr: {
        backgroundColor: theme.white,
        borderBottom: `1px solid ${theme.gray200}`,
        transition: 'background-color 150ms ease',
    },
    trHover: {
        backgroundColor: theme.gray50,
    },
    td: {
        padding: '16px 24px', // px-6 py-4
        whiteSpace: 'nowrap',
        color: theme.gray800,
        border: 'none', // Quitamos bordes internos
    },
    // Estilos Específicos de Celdas
    idLink: {
        color: theme.green,
        fontWeight: 700,
        textDecoration: 'none',
        transition: 'color 150ms ease',
    },
    idLinkHover: {
        color: theme.greenDark,
    },
    totalText: {
        fontWeight: 700,
        color: theme.gray800,
    },
    actionCenter: {
        textAlign: 'center',
    },
    // Botón de Acción
    actionButton: {
        backgroundColor: theme.green,
        color: theme.white,
        padding: '8px 12px', // p-2
        borderRadius: '6px', // rounded-md
        fontSize: '12px', // text-xs
        fontWeight: 600, // font-semibold
        transition: 'background-color 150ms ease, box-shadow 150ms ease',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
    },
    actionButtonHover: {
        backgroundColor: theme.greenDark,
    },
    // Controles de Paginación
    paginationWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '20px', // mt-5
        gap: '8px', // gap-2
    },
    // Botones de Navegación (< / >)
    navButton: {
        padding: '8px', // p-2
        color: theme.gray600,
        transition: 'color 150ms ease',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
    },
    navButtonHover: {
        color: theme.gray800,
    },
    navButtonDisabled: {
        opacity: 0.5,
        cursor: 'default',
    },
    // Botones de Número de Página
    pageButton: {
        width: '32px', // w-8
        height: '32px', // h-8
        borderRadius: '50%', // rounded-full
        fontWeight: 700, // font-bold
        transition: 'all 150ms ease',
        border: `1px solid ${theme.gray300}`,
        backgroundColor: theme.white,
        color: theme.gray700,
        cursor: 'pointer',
    },
    pageButtonActive: {
        backgroundColor: theme.green,
        color: theme.white,
        boxShadow: theme.shadowMd,
        border: 'none',
    },
    pageButtonHover: {
        backgroundColor: theme.gray100,
    },
    pageEllipsis: {
        cursor: 'default',
        opacity: 0.5,
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0 4px',
    }
};

// Componente principal
export default function UserOrdersTable() {
    // Usamos useState para gestionar la paginación de manera interactiva
    const [currentPage, setCurrentPage] = useState(1);
    
    // Datos de órdenes simulados (para asegurar que la tabla tenga contenido)
    const simulatedOrders = [
        { id: '#1234', date: '20/01/2025', total: 199.00 },
        { id: '#2356', date: '20/02/2025', total: 199.00 },
        { id: '#4577', date: '20/03/2025', total: 199.00 },
        { id: '#3743', date: '20/03/2025', total: 199.00 },
        { id: '#3744', date: '20/03/2025', total: 199.00 },
        { id: '#3745', date: '20/03/2025', total: 199.00 },
    ];
    
    // Lógica simple de paginación
    const pageNumbers = [1, 2, 3, '...', 10];
    const maxPage = 10;
    
    const handlePageChange = (page) => {
        if (typeof page === 'number' && page >= 1 && page <= maxPage) {
            setCurrentPage(page);
        }
    };
    
    // Lógica para manejar efectos hover
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>Últimas Órdenes</h2>
            
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.th}>#ID</th>
                            <th style={styles.th}>Fecha</th>
                            <th style={styles.th}>Total</th>
                            <th style={{...styles.th, ...styles.thCenter}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {simulatedOrders.map((order, index) => {
                            // Estilo de fila
                            const rowStyle = { 
                                ...styles.tr, 
                                ...(hoveredRow === index ? styles.trHover : {}) 
                            };

                            return (
                                <tr 
                                    key={index} 
                                    style={rowStyle}
                                    onMouseOver={() => setHoveredRow(index)}
                                    onMouseOut={() => setHoveredRow(null)}
                                >
                                    <td style={styles.td}>
                                        <a 
                                            href="#" 
                                            style={{ 
                                                ...styles.idLink, 
                                                ...(hoveredLink === `id-${index}` ? styles.idLinkHover : {}) 
                                            }}
                                            onMouseOver={() => setHoveredLink(`id-${index}`)}
                                            onMouseOut={() => setHoveredLink(null)}
                                        >
                                            {order.id}
                                        </a>
                                    </td>
                                    <td style={styles.td}>{order.date}</td>
                                    <td style={{...styles.td, ...styles.totalText}}>S/ {order.total.toFixed(2)}</td>
                                    <td style={{...styles.td, ...styles.actionCenter}}>
                                        <button 
                                            style={{ 
                                                ...styles.actionButton, 
                                                ...(hoveredButton === `action-${index}` ? styles.actionButtonHover : {}) 
                                            }}
                                            onMouseOver={() => setHoveredButton(`action-${index}`)}
                                            onMouseOut={() => setHoveredButton(null)}
                                            onClick={() => console.log('Ver detalle de orden', order.id)}
                                        >
                                            Ver detalle
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Controles de Paginación */}
            <div style={styles.paginationWrapper}>
                {/* Botón Anterior */}
                <button 
                    style={{ 
                        ...styles.navButton, 
                        ...(currentPage === 1 ? styles.navButtonDisabled : {}),
                        ...(hoveredButton === 'prev' && currentPage !== 1 ? styles.navButtonHover : {})
                    }}
                    disabled={currentPage === 1}
                    onMouseOver={() => setHoveredButton('prev')}
                    onMouseOut={() => setHoveredButton(null)}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <ChevronLeft size={18} />
                </button>
                
                {/* Números de Página */}
                {pageNumbers.map((page, index) => {
                    const isActive = page === currentPage;
                    const isEllipsis = page === '...';
                    
                    // Estilo de botón
                    const pageBtnStyle = isActive 
                        ? styles.pageButtonActive 
                        : (isEllipsis ? styles.pageEllipsis : styles.pageButton);
                        
                    // Estilo de hover
                    const pageHoverStyle = (hoveredButton === `page-${index}` && !isActive && !isEllipsis)
                        ? styles.pageButtonHover : {};

                    return (
                        <button 
                            key={index}
                            style={{ ...pageBtnStyle, ...pageHoverStyle }}
                            disabled={isEllipsis}
                            onMouseOver={() => setHoveredButton(`page-${index}`)}
                            onMouseOut={() => setHoveredButton(null)}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    );
                })}
                
                {/* Botón Siguiente */}
                <button 
                    style={{ 
                        ...styles.navButton, 
                        ...(currentPage === maxPage ? styles.navButtonDisabled : {}),
                        ...(hoveredButton === 'next' && currentPage !== maxPage ? styles.navButtonHover : {})
                    }}
                    disabled={currentPage === maxPage}
                    onMouseOver={() => setHoveredButton('next')}
                    onMouseOut={() => setHoveredButton(null)}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}