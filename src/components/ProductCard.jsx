import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/carro');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3>{product.name}</h3>
      <p className="price">S/ {product.price.toFixed(2)}</p>
      <button className="btn-add" onClick={handleAddToCart}>
        AGREGAR
      </button>
    </div>
  );
}