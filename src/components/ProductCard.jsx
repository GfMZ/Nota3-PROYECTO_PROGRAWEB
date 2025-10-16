import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product);
    alert(`${product.name} agregado al carrito.`);
  };

  return (
    <Link to={`/producto/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3>{product.name}</h3>
      <p className="price">S/ {product.price.toFixed(2)}</p>
      <button className="btn-add" onClick={handleAddToCart}>
        Añadir al Carrito
      </button>
    </Link>
  );
}