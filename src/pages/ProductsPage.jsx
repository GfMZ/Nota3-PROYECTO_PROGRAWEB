import React from 'react';
import ProductList from '../components/ProductList';
import Productos from '../components/Productos';

export default function ProductsPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Nuestros Productos</h1>
      <ProductList />
      <Productos />
    </div>
  );
}