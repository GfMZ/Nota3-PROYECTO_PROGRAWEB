import React from 'react';
import ProductCard from './ProductCard';

const productsData = [
    { id: 101, name: 'The Last of Us Part II', price: 150.00, imageUrl: '/img/tlou2.jpg' },
    { id: 102, name: 'Consola PS5', price: 2800.00, imageUrl: '/img/consolas.jpg' },
    { id: 103, name: 'Juegos Varios', price: 250.00, imageUrl: '/img/videojuegos.jpg' },
    { id: 104, name: 'Set de Periféricos', price: 450.00, imageUrl: '/img/perifericos.jpg' }
];

export default function ProductList() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
      {productsData.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}