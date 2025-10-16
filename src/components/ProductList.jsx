import React from 'react';
import ProductCard from './ProductCard';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '24px',
  padding: '16px 0',
};

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>No se encontraron productos que coincidan con su búsqueda.</p>;
  }

  return (
    <div style={gridStyles}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}