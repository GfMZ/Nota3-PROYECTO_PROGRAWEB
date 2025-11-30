import React from 'react';

const theme = {
    green: '#2e9b1f', 
    dark: '#1f2937', 
    gray500: '#6b7280',
    gray700: '#374151',
    gray900: '#111827',
    borderColor: '#e5e7eb',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
};

const itemStyles = {
    container: { marginBottom: '8px', display: 'block', },
    label: { fontSize: '16px', color: theme.gray900, fontWeight: 'normal', marginRight: '8px', display: 'inline', },
    valueBase: { fontSize: '16px', fontWeight: 'normal', color: theme.gray900, display: 'inline', },
    link: { fontSize: '16px', fontWeight: 'normal', color: theme.gray900, textDecoration: 'underline', cursor: 'pointer', },
    status: { fontSize: '16px', fontWeight: 'normal', color: theme.gray900, },
};

const cardStyles = {
    card: { backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: theme.shadowXl, border: `1px solid ${theme.borderColor}`, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', },
    userNameTitle: { fontSize: '32px', fontWeight: '700', color: theme.dark, marginBottom: '20px', },
    imageContainer: { marginLeft: '40px', textAlign: 'center', flexShrink: 0, },
    profileImage: { width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${theme.borderColor}`, boxShadow: theme.shadowXl, margin: '0 auto', },
};

const DetailItem = ({ label, value, isLink = false, isStatus = false }) => {
    let ValueElement;
    if (isLink) {
        ValueElement = <a href={`mailto:${value}`} style={itemStyles.link}>{value}</a>;
    } else if (isStatus) {
        ValueElement = <span style={itemStyles.status}>{value}</span>;
    } else {
        ValueElement = <span style={itemStyles.valueBase}>{value}</span>;
    }
    return (
        <div style={itemStyles.container}>
            <span style={itemStyles.label}>{label}:</span>
            {ValueElement}
        </div>
    );
};

export default function UserDetailCard({ user }) {
    // CORRECCIÓN: Manejo de datos inexistentes en SQL
    // Si no hay fecha de registro en DB, mostramos "N/A" o la fecha actual si es nuevo
    const displayDate = user.createdAt 
        ? new Date(user.createdAt).toLocaleDateString() 
        : 'Usuario Registrado'; 

    return (
        <div style={cardStyles.card}>
            <div style={{ flex: 1, marginRight: '40px' }}>
                <h2 style={cardStyles.userNameTitle}>
                    {user.name} 
                </h2>
                
                <DetailItem label="Correo" value={user.email} isLink={true} />
                <DetailItem label="Estado" value={user.role === 'admin' ? 'Administrador' : 'Cliente Activo'} isStatus={true} />
                <DetailItem label="Miembro desde" value={displayDate} />
            </div>

            <div style={cardStyles.imageContainer}>
                <img 
                    // CORRECCIÓN: Fallback seguro si no hay imagen en la DB
                    src={user.imageUrl || 'https://placehold.co/160x160/A8D08D/000000?text=JP'} 
                    alt="Perfil de usuario"
                    style={cardStyles.profileImage}
                    onError={(e) => { e.target.src = 'https://placehold.co/160x160/A8D08D/000000?text=JP'; }}
                />
            </div>
        </div>
    );
}