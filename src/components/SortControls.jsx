import React from 'react';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  marginBottom: '24px',
};

const selectStyles = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  backgroundColor: 'white',
  fontWeight: '500',
};

export default function SortControls({ onSortChange }) {
  const handleSort = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div style={containerStyles}>
      <span>Ordenar por:</span>
      <select onChange={handleSort} style={selectStyles}>
        <option value="default">Relevancia</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </select>
    </div>
  );
}