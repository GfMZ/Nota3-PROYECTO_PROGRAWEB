import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    if (isAdded) return; 

    
    const itemToAdd = {
        id: product.id, 
        productId: product.id, 
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
    };

    addToCart(itemToAdd);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000); 
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="product-image">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/f3f3f3/ccc?text=Sin+Imagen" }}
          />
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
          cursor: isAdded ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {isAdded ? '¡Agregado!' : 'AGREGAR'}
      </button>
    </div>
  );
}