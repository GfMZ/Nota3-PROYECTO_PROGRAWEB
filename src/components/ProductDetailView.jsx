import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const viewStyles = {
  container: {
    display: 'flex',
    gap: '40px',
    padding: '32px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '32px',
  },
  imageWrapper: {
    width: '40%',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  },
  infoWrapper: {
    flex: 1,
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 16px 0',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '24px',
  },
  price: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2e9b1f',
    marginBottom: '24px',
  },
  addButton: {
    backgroundColor: '#2e9b1f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  breadcrumb: {
    marginBottom: '16px',
    color: '#6b7280',
  }
};

export default function ProductDetailView({ product }) {
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

  const dynamicButtonStyles = {
    ...viewStyles.addButton,
    backgroundColor: isAdded ? '#6c757d' : '#2e9b1f',
    cursor: isAdded ? 'not-allowed' : 'pointer'
  };

  return (
    <div>
      <div style={viewStyles.breadcrumb}>
        {`Videojuegos > ${product.category}`}
      </div>
      <div style={viewStyles.container}>
        <div style={viewStyles.imageWrapper}>
          <img src={product.imageUrl} alt={product.name} style={viewStyles.image} />
        </div>
        <div style={viewStyles.infoWrapper}>
          <h1 style={viewStyles.title}>{product.name}</h1>
          <p style={viewStyles.description}>
            DESCRIPCION DEL PRODUCTO
          </p>
          <div style={viewStyles.price}>s/ {product.price.toFixed(2)}</div>
          <button 
            onClick={handleAddToCart} 
            style={dynamicButtonStyles}
            disabled={isAdded}
          >
            {isAdded ? '¡Producto agregado! ' : (
              <>
                <ShoppingCart size={20} /> AGREGAR
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}