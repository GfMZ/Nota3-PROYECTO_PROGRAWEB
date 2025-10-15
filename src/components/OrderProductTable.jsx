import React from 'react';

// Este componente debe ser definido en el mismo archivo para que las referencias funcionen en este entorno.
const OrderProductRow = ({ id, name, category, quantity, total, imageUrl }) => {
  const rowStyle = {
    borderBottom: '1px solid #f3f4f6', // border-gray-100
    transition: 'background-color 0.15s',
  };
  const cellStyle = {
    padding: '12px 16px', // px-4 py-3
    whiteSpace: 'nowrap',
    fontSize: '14px', // text-sm
    color: '#374151', // text-gray-700
  };

  const PLACEHOLDER_IMG_URL = "https://placehold.co/40x40/cbd5e1/4b5563?text=N/A";

  return (
    <tr 
      style={rowStyle} 
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} 
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      
      {/* ID (con imagen y código en verde) */}
      <td style={{ ...cellStyle, fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
        <img
          src={imageUrl}
          alt={name}
          style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
          // Fallback en caso de que la URL de la imagen no cargue
          onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG_URL; }}
        />
        {/* El color verde para el ID se mantiene aquí: color: '#059669' */}
        <span style={{ color: '#059669', fontWeight: '600' }}>{id}</span>
      </td>
      
      {/* Nombre */}
      <td style={cellStyle}>{name}</td>
      
      {/* Categoría */}
      <td style={{ ...cellStyle, color: '#6b7280' }}>{category}</td>
      
      {/* Cantidad */}
      <td style={cellStyle}>{quantity}</td>
      
      {/* Total */}
      <td style={{ ...cellStyle, fontWeight: 'bold', color: '#1f2937' }}>{total}</td>
    </tr>
  );
};


// Componente para la tabla de productos ordenados
export default function OrderProductTable() {
  
  // Productos con las URLs de imagen proporcionadas
  const mockProducts = [
      { 
          id: '#9001', 
          name: 'Salchipapa Clásica', 
          category: 'Comida Rápida', 
          quantity: 2, 
          total: 'S/ 15.50', 
          imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.WJXMvDvwcY_tquRGFavTBAHaD8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' 
      },
      { 
          id: '#1337', 
          name: 'Bloque de Comandos', 
          category: 'Minecraft', 
          quantity: 64, 
          total: 'S/ 0.00', 
          imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.Nfl7TT94tLw4qwMP8ClvwAAAAA?cb=12&w=150&h=150&rs=1&pid=ImgDetMain&o=7&rm=3' 
      },
  ];

  const headerStyle = {
    textAlign: 'left',
    backgroundColor: '#f9fafb', // gray-50
    color: '#4b5563', // gray-600
    textTransform: 'uppercase',
    fontSize: '12px', // text-xs
    fontWeight: 'bold',
    padding: '12px 16px', // px-4 py-3
  };

  // 1. ESTILO BASE UNIFICADO para números de página inactivos (incluye hover/out)
  const pageNumberStyle = { 
    padding: '4px 12px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'background-color 0.15s',
    color: '#4b5563', 
    // Manejadores de eventos integrados en el objeto de estilo
    onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb',
    onMouseOut: (e) => e.currentTarget.style.backgroundColor = 'transparent',
  };
  
  // 2. Estilo para la página activa
  const activePageStyle = { 
    ...pageNumberStyle, // Hereda el formato base
    backgroundColor: '#059669', // green-600
    color: '#ffffff', // white text
    fontWeight: 'bold',
    cursor: 'default',
    pointerEvents: 'none', 
    onMouseOver: null, // Desactiva hover
    onMouseOut: null,  // Desactiva out
  };
  
  // 3. Estilo para los puntos suspensivos
  const ellipsisStyle = {
    padding: '4px 0', 
    color: '#9ca3af', 
    cursor: 'default',
  };

  // Componente reutilizable para los números de página (inactivo)
  const PageNumber = ({ number }) => (
    <span 
      style={{
        padding: pageNumberStyle.padding,
        borderRadius: pageNumberStyle.borderRadius,
        cursor: pageNumberStyle.cursor,
        transition: pageNumberStyle.transition,
        color: pageNumberStyle.color,
      }}
      onMouseOver={pageNumberStyle.onMouseOver}
      onMouseOut={pageNumberStyle.onMouseOut}
    >
      {number}
    </span>
  );

  return (
    <div style={{ backgroundColor: '#ffffff', marginTop: '24px', padding: '0' }}>
        
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Productos ordenados</h3>

      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerStyle}>Id</th>
              <th style={headerStyle}>Nombre</th>
              <th style={headerStyle}>Categoría</th>
              <th style={headerStyle}>Cantidad</th>
              <th style={headerStyle}>Total</th>
            </tr>
          </thead>
          <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
            {mockProducts.map((product) => (
              <OrderProductRow key={product.id} {...product} />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Paginación (Estática) - Utilizando el componente PageNumber y estilos unificados */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
          {/* Botón Anterior */}
          <button style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'background-color 0.15s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* Página 1 (Activa) - Estilo Activo */}
          <span style={activePageStyle}>1</span>
        
          {/* Página 2 - Componente Reutilizable */}
          <PageNumber number={2} />
        
          {/* Página 3 - Componente Reutilizable */}
          <PageNumber number={3} />

          {/* Puntos suspensivos */}
          <span style={ellipsisStyle}>...</span>

          {/* Página 10 - Componente Reutilizable */}
          <PageNumber number={10} />

          {/* Botón Siguiente */}
          <button style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'background-color 0.15s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
      </div>
    </div>
  );
}
