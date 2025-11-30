import React, { useState } from 'react';


const OrderProductRow = ({ id, name, category, quantity, total, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  const rowStyle = {
    borderBottom: '1px solid #f3f4f6', 
    transition: 'background-color 0.15s ease',
    backgroundColor: isHovered ? '#f9fafb' : 'transparent',
  };

  const cellStyle = {
    padding: '12px 16px', 
    whiteSpace: 'nowrap',
    fontSize: '14px', 
    color: '#374151', 
    verticalAlign: 'middle',
  };

  const idCellStyle = {
    ...cellStyle,
    fontWeight: '500',
    color: '#1f2937', 
    display: 'flex',
    alignItems: 'center',
  };

  const totalCellStyle = {
    ...cellStyle,
    fontWeight: '700',
    color: '#1f2937',
  };

  const PLACEHOLDER_IMG_URL = "https://placehold.co/40x40/cbd5e1/4b5563?text=IMG";

  return (
    <tr 
      style={rowStyle} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ID e Imagen */}
      <td style={idCellStyle}>
        <img
          src={imageUrl}
          alt={name}
          style={{ 
            width: '40px', 
            height: '40px', 
            objectFit: 'contain', 
            marginRight: '12px', 
            borderRadius: '6px', 
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff' 
          }}
          onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG_URL; }}
        />
        <span style={{ color: '#16a34a', fontWeight: '600' }}>{id}</span>
      </td>
      
      <td style={cellStyle}>{name}</td>
      <td style={{ ...cellStyle, color: '#6b7280' }}>{category || '-'}</td>
      <td style={cellStyle}>{quantity}</td>
      <td style={totalCellStyle}>{total}</td>
    </tr>
  );
};


export default function OrderProductTable({ items = [] }) { 
  
  // Si no hay ítems, mostramos un mensaje vacío 
  if (!items || items.length === 0) {
      return (
        <div style={{ 
            backgroundColor: '#ffffff', 
            marginTop: '24px', 
            padding: '40px', 
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#6b7280'
        }}>
            No hay productos en esta orden.
        </div>
      );
  }

  const headerStyle = {
    textAlign: 'left',
    backgroundColor: '#f9fafb', 
    color: '#4b5563', 
    textTransform: 'uppercase',
    fontSize: '11px', 
    fontWeight: '700',
    padding: '12px 16px', 
    letterSpacing: '0.05em'
  };

  return (
      <div style={{ backgroundColor: '#ffffff', marginTop: '24px', padding: '0' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            Productos ordenados ({items.length})
        </h3>

        <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                <th style={headerStyle}>Producto</th>
                <th style={headerStyle}>Nombre</th>
                <th style={headerStyle}>Categoría</th> 
                <th style={headerStyle}>Cantidad</th>
                <th style={headerStyle}>Subtotal</th>
                </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {items.map((item, index) => {
                    // LÓGICA DE SEGURIDAD (PostgreSQL vs Legacy)
                    
                    // 1. Extraer ID: Si 'product' es un objeto (SQL), usamos .id. Si es string/num, lo usamos directo.
                    const rawId = item.product?.id || item.product;
                    const displayId = rawId ? String(rawId).slice(-6).toUpperCase() : 'N/A';

                    // 2. Extraer Categoría: Ahora vive DENTRO del producto
                    const categoryName = item.product?.category?.name || 'General';

                    return (
                        <OrderProductRow 
                            key={index} 
                            id={displayId} 
                            name={item.name}
                            category={categoryName} 
                            quantity={item.quantity}
                            total={`S/ ${(item.price * item.quantity).toFixed(2)}`}
                            imageUrl={item.imageUrl}
                        />
                    );
                })}
            </tbody>
        </table>
        </div>
    </div>
  );}