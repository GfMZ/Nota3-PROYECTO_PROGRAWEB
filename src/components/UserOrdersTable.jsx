// UserOrdersTable.jsx
import React from 'react';

const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse'
};

const thStyles = {
    borderBottom: '2px solid #EEE',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#F9F9F9',
    fontWeight: 'bold',
    color: '#555'
};

const tdStyles = {
    borderBottom: '1px solid #EEE',
    padding: '12px',
    color: '#333',
    fontSize: '14px'
};

const actionButtonStyles = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '12px'
};

const orderIdStyles = {
    color: '#4CAF50', 
    fontWeight: 'bold',
    textDecoration: 'none'
};

export default function UserOrdersTable({ orders }) {
    return (
        <table style={tableStyles}>
            <thead>
                <tr>
                    <th style={thStyles}>#ID</th>
                    <th style={thStyles}>Fecha</th>
                    <th style={thStyles}>Total</th>
                    <th style={thStyles}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td style={tdStyles}><a href="#" style={orderIdStyles}>#{order.id}</a></td>
                        <td style={tdStyles}>{order.date}</td>
                        <td style={tdStyles}>S/{order.total}</td>
                        <td style={tdStyles}>
                            <button style={actionButtonStyles}>Ver detalle</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}