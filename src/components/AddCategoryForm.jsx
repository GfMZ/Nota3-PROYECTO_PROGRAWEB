// ./components/AddCategoryForm.jsx
import React, { useState } from 'react';

// Se recibe 'isOpen' para mostrar/ocultar y 'onClose' para cerrar la modal.
export default function AddCategoryForm({ isOpen, onClose, onSave }) {
    
    // Si la modal no debe estar visible, no renderizamos nada.
    if (!isOpen) return null;

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        onSave({ 
            name: categoryName, 
            description: categoryDescription 
        });
        
        // Limpiar el formulario y cerrar la modal
        setCategoryName('');
        setCategoryDescription('');
        onClose(); 
    };

    // --- Estilos de la Modal ---
    const modalOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente oscuro
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000 // Asegura que esté por encima de todo
    };

    const modalContentStyles = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '550px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    };

    const inputLabelStyles = {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px',
        marginTop: '15px',
        color: '#333'
    };

    const textInputStyles = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    };

    const descriptionInputStyles = {
        ...textInputStyles,
        minHeight: '100px',
        resize: 'vertical'
    };

    const buttonStyles = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25px',
        float: 'right'
    };

    return (
        <div style={modalOverlayStyles} onClick={onClose}>
            <div style={modalContentStyles} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: '22px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    Nueva categoría
                </h2>
                
                <form onSubmit={handleSubmit}>
                    {/* ... (Campos Nombre y Descripción) ... */}
                    
                    {/* Campo Nombre */}
                    <label htmlFor="categoryName" style={inputLabelStyles}>Nombre</label>
                    <input
                        id="categoryName"
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        style={textInputStyles}
                    />

                    {/* Campo Descripción */}
                    <label htmlFor="categoryDescription" style={inputLabelStyles}>Descripción</label>
                    <textarea
                        id="categoryDescription"
                        placeholder="Descripción del producto..."
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        required
                        style={descriptionInputStyles}
                    />
                    
                    {/* Botón de Acción */}
                    <button type="submit" style={buttonStyles}>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>&#x2713;</span>
                        Crear categoría
                    </button>
                </form>
            </div>
        </div>
    );
}