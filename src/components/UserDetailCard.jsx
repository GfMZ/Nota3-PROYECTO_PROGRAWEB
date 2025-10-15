import React from 'react';

// --- DEFINICIÓN DE TEMA LOCAL ---
const theme = {
    green: '#2e9b1f', 
    dark: '#1f2937', 
    gray500: '#6b7280',
    gray700: '#374151',
    gray900: '#111827',
    borderColor: '#e5e7eb',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
};

// --- Definición de Estilos (Objetos JS) ---
const itemStyles = {
    // Clases base para el contenedor de cada detalle (simula mb-2)
    container: {
        marginBottom: '8px', 
        display: 'block', 
    },
    // Etiqueta (Label)
    label: {
        fontSize: '16px', 
        color: theme.gray900, // Etiqueta oscura
        fontWeight: 'normal',
        marginRight: '8px',
        display: 'inline', 
    },
    // Valor (Value)
    valueBase: {
        fontSize: '16px',
        fontWeight: 'normal', // Valor normal para que destaque la etiqueta
        color: theme.gray900, 
        display: 'inline',
    },
    // Link (como Correo)
    link: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: theme.gray900,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    // Status (Activo/Inactivo)
    status: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: theme.gray900, 
    },
};

const cardStyles = {
    // Clases para el componente principal
    card: {
        backgroundColor: 'white',
        padding: '32px', 
        borderRadius: '12px',
        boxShadow: theme.shadowXl, 
        border: `1px solid ${theme.borderColor}`, 
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px', 
    },
    // Estilo del nombre de usuario para que sea el encabezado principal
    userNameTitle: {
        fontSize: '32px', 
        fontWeight: '700', 
        color: theme.dark,
        marginBottom: '20px', 
    },
    imageContainer: {
        marginLeft: '40px',
        textAlign: 'center',
        flexShrink: 0,
    },
    profileImage: {
        width: '160px', 
        height: '160px', 
        borderRadius: '50%', 
        objectFit: 'cover',
        border: `4px solid ${theme.borderColor}`, // Borde simple, más discreto
        boxShadow: theme.shadowXl, 
        margin: '0 auto', 
    },
};


// --- Subcomponente DetailItem ---
const DetailItem = ({ label, value, isLink = false, isStatus = false }) => {
    let ValueElement;

    if (isLink) {
        ValueElement = (
            <a href={`mailto:${value}`} style={itemStyles.link}>
                {value}
            </a>
        );
    } else if (isStatus) {
        ValueElement = (
            <span style={itemStyles.status}>
                {value}
            </span>
        );
    } else {
        ValueElement = (
            <span style={itemStyles.valueBase}>
                {value}
            </span>
        );
    }

    // Estructura para mostrar la etiqueta y el valor en la misma línea
    return (
        <div style={itemStyles.container}>
            <span style={itemStyles.label}>
                {label}:
            </span>
            {ValueElement}
        </div>
    );
};

// --- UserDetailCard Component (Contenido de la Caja Blanca) ---
export default function UserDetailCard({ user }) {
    
    return (
        <div style={cardStyles.card}>
            
            {/* Detalles del Usuario (Izquierda) */}
            <div style={{ flex: 1, marginRight: '40px' }}>
                <h2 style={cardStyles.userNameTitle}>
                    {user.name} 
                </h2>
                
                <DetailItem label="Correo" value={user.email} isLink={true} />
                <DetailItem label="Fecha de registro" value={user.registrationDate} />
                <DetailItem label="Estado" value={user.status} isStatus={true} />

            </div>

            {/* Imagen de Perfil (Derecha) */}
            <div style={cardStyles.imageContainer}>
                <img 
                    src={user.imageUrl} 
                    alt="Perfil de usuario"
                    style={cardStyles.profileImage}
                    onError={(e) => { e.target.src = 'https://placehold.co/160x160/A8D08D/000000?text=JP'; }}
                />
            </div>
        </div>
    );
}