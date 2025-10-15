// CategoryTable.jsx
import React from 'react';

const CategoryTable = ({ categories }) => {
    const tableContainerStyles = {
        flexGrow: 1,
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const searchInputContainerStyles = {
        position: 'relative',
        flexGrow: 1,
        marginRight: '20px',
        maxWidth: '400px'
    };

    const searchInputStyles = {
        width: '100%',
        padding: '8px 10px 8px 35px',
        borderRadius: '5px',
        border: '1px solid #DDD'
    };

    const searchIconStyles = {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#888'
    };

    const addButtonStyles = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    };

    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
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
        color: '#333'
    };

    const actionIconStyles = {
        fontSize: '18px',
        margin: '0 5px',
        cursor: 'pointer',
        color: '#666'
    };

    return (
        <div style={tableContainerStyles}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Listado de categorías</div>

            <div style={headerStyles}>
                <div style={searchInputContainerStyles}>
                    <span style={searchIconStyles}>&#128269;</span> {/* Lupa */}
                    <input
                        type="text"
                        placeholder="Buscar un producto..."
                        style={searchInputStyles}
                    />
                </div>
                <button style={addButtonStyles}>
                    <span style={{ fontSize: '20px', marginRight: '5px' }}>&#x271A;</span> {/* Cruz/Más */}
                    Agregar categoría
                </button>
            </div>

            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Nombre</th>
                        <th style={thStyles}>Descripción</th>
                        <th style={thStyles}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td style={tdStyles}>{category.name}</td>
                            <td style={tdStyles}>{category.description}</td>
                            <td style={tdStyles}>
                                <span style={actionIconStyles} title="Editar">&#9998;</span> {/* Lápiz */}
                                <span style={actionIconStyles} title="Eliminar">🗑️</span> {/* Bote de basura */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;