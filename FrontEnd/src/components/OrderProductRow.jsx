import React, { useState } from 'react';

export default function OrderProductRow({ id, name, category, quantity, total, imageUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  
  const styles = {
    tr: {
      borderBottom: '1px solid #f3f4f6',
      backgroundColor: isHovered ? '#f9fafb' : 'transparent', 
      transition: 'background-color 150ms ease',
    },
    td: {
      padding: '12px 16px', 
      whiteSpace: 'nowrap',
      fontSize: '14px', 
      color: '#374151', 
    },
    tdFirst: {
      fontWeight: '500',
      color: '#1f2937', 
      display: 'flex',
      alignItems: 'center',
    },
    img: {
      width: '40px', 
      height: '40px', 
      objectFit: 'contain',
      marginRight: '12px', 
      borderRadius: '6px', 
      border: '1px solid #e5e7eb', 
    },
    idText: {
      color: '#16a34a', 
      fontWeight: '600',
    },
    totalText: {
      fontWeight: '700',
      color: '#1f2937', 
    }
  };

  return (
    <tr 
      style={styles.tr} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <td style={{ ...styles.td, ...styles.tdFirst }}>
        <img
          src={imageUrl}
          alt={name}
          style={styles.img}
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cbd5e1/4b5563?text=N/A" }}
        />
        <span style={styles.idText}>{id}</span>
      </td>
      
      
      <td style={styles.td}>{name}</td>
      
      
      <td style={{ ...styles.td, color: '#6b7280' }}>{category || '-'}</td>
      
      
      <td style={styles.td}>{quantity}</td>
      
      
      <td style={{ ...styles.td, ...styles.totalText }}>{total}</td>
    </tr>
  );
}