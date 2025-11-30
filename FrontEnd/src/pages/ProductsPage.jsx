import React from 'react';
import Productos from '../components/Productos'; 

export default function ProductsPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}></h1>
      <Productos /> 
    </div>
  );
}