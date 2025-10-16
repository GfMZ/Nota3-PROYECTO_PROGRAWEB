import React from 'react';
import ProductList from '../components/ProductList';

export default function ProductsPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Nuestros Productos</h1>
      <ProductList />
    </div>
  );
}