import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3>{product.name}</h3>
      <p className="price">S/ {product.price.toFixed(2)}</p>
      <button className="btn-add" onClick={() => addToCart(product)}>
        Añadir al Carrito
      </button>
    </div>
  );
}