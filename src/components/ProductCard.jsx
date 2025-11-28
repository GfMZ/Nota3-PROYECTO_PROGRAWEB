import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Importamos Link

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAdded) return; 

    addToCart(product);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000); 
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h3>{product.name}</h3>
      </Link>
      <p className="price">S/ {product.price.toFixed(2)}</p>
      <button 
        className="btn-add" 
        onClick={handleAddToCart}
        disabled={isAdded}
        style={{ 
          backgroundColor: isAdded ? '#6c757d' : '',
          cursor: isAdded ? 'not-allowed' : 'pointer'
        }}
      >
        {isAdded ? '¡Producto agregado!' : 'AGREGAR'}
      </button>
    </div>
  );
}