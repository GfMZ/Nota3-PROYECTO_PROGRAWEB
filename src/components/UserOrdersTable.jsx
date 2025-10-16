import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    wrapper: {
    backgroundColor: theme.white,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: theme.shadowMd,
    border: `1px solid ${theme.gray200}`,
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
},
    title: {
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '20px',
        color: theme.gray800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        minWidth: '100%',
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        border: `1px solid ${theme.gray200}`,
        borderRadius: '8px',
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: theme.gray50,
        borderBottom: `1px solid ${theme.gray200}`,
    },
    th: {
        padding: '12px 24px', 
        textAlign: 'left',
        fontSize: '10px', 
        fontWeight: 600, 
        color: theme.gray600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em', 
    },
    thCenter: {
        textAlign: 'center',
    },
    tr: {
        backgroundColor: theme.white,
        borderBottom: `1px solid ${theme.gray200}`,
        transition: 'background-color 150ms ease',
    },
    trHover: {
        backgroundColor: theme.gray50,
    },
    td: {
        padding: '16px 24px', 
        whiteSpace: 'nowrap',
        color: theme.gray800,
        border: 'none', 
    },
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
    actionButton: {
        backgroundColor: theme.green,
        color: theme.white,
        padding: '8px 12px', 
        borderRadius: '6px', 
        fontSize: '12px', 
        fontWeight: 600, 
        transition: 'background-color 150ms ease, box-shadow 150ms ease',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
    },
    actionButtonHover: {
        backgroundColor: theme.greenDark,
    },
    paginationWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '20px', 
        gap: '8px', 
    },
    navButton: {
        padding: '8px', 
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
    pageButton: {
        width: '32px', 
        height: '32px', 
        borderRadius: '50%', 
        fontWeight: 700, 
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

export default function UserOrdersTable() {
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const simulatedOrders = [
        { id: '#1234', date: '20/01/2025', total: 199.00 },
        { id: '#2356', date: '20/02/2025', total: 199.00 },
        { id: '#4577', date: '20/03/2025', total: 199.00 },
        { id: '#3743', date: '20/03/2025', total: 199.00 },
        { id: '#3744', date: '20/03/2025', total: 199.00 },
        { id: '#3745', date: '20/03/2025', total: 199.00 },
    ];
    
    const pageNumbers = [1, 2, 3, '...', 10];
    const maxPage = 10;
    
    const handlePageChange = (page) => {
        if (typeof page === 'number' && page >= 1 && page <= maxPage) {
            setCurrentPage(page);
        }
    };
    
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
                                        <Link to="/orden/detalles">
                                            <button 
                                                style={{ 
                                                    ...styles.actionButton, 
                                                    ...(hoveredButton === `action-${index}` ? styles.actionButtonHover : {}) 
                                                }}
                                                onMouseOver={() => setHoveredButton(`action-${index}`)}
                                                onMouseOut={() => setHoveredButton(null)}
                                            >
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
            
            <div style={styles.paginationWrapper}>
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
                
                {pageNumbers.map((page, index) => {
                    const isActive = page === currentPage;
                    const isEllipsis = page === '...';
                    
                    const pageBtnStyle = isActive 
                        ? styles.pageButtonActive 
                        : (isEllipsis ? styles.pageEllipsis : styles.pageButton);
                        
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