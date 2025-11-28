import React from 'react';
import Productos from '../components/Productos'; // El catálogo dinámico real

export default function ProductsPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>Nuestros Productos</h1>
      <Productos /> 
    </div>
  );
}