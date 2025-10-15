// UserDetailCard.jsx
import React from 'react';

const detailRowStyles = {
    marginBottom: '10px',
    fontSize: '16px'
};

const detailLabelStyles = {
    fontWeight: 'bold',
    color: '#333'
};

const profileImageStyles = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #ddd'
};

const cardStyles = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'flex-start'
};

export default function UserDetailCard({ user }) {
    return (
        <div style={cardStyles}>
            
            {/* Columna de Texto */}
            <div style={{ flexGrow: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>{user.name}</h2>
                
                <p style={detailRowStyles}>
                    <span style={detailLabelStyles}>Correo: </span>
                    <a href={`mailto:${user.email}`} style={{ color: '#007BFF', textDecoration: 'none' }}>{user.email}</a>
                </p>
                
                <p style={detailRowStyles}>
                    <span style={detailLabelStyles}>Fecha de registro: </span>
                    {user.registrationDate}
                </p>
                
                <p style={detailRowStyles}>
                    <span style={detailLabelStyles}>Estado: </span>
                    {user.status}
                </p>
            </div>

            {/* Columna de Imagen */}
            <div>
                <img src={user.imageUrl} alt="Perfil" style={profileImageStyles} />
            </div>
        </div>
    );
}