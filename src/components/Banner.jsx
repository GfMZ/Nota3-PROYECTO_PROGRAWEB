import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import banner1 from '../img/tlou2.jpg';

export default function Banner() {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const bannerProduct = {
    id: 101,
    name: 'The Last Of Us Part II / Remastered (PS5)',
    price: 119.90,
    imageUrl: banner1
  };

  const handleAddToCart = () => {
    if (isAdded) return;

    addToCart(bannerProduct);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section className="gp-banner">
      <div className="gp-banner-inner">
        <div className="banner-image">
            <img
            src={banner1}
            alt="Banner principal"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
          />  
        </div>

        <div className="banner-content">
          <h2>{bannerProduct.name}</h2>
          <p className="price">S/ {bannerProduct.price.toFixed(2)} <span className="old">S/ 199.90</span></p>
          <button 
            className="btn-add" 
            onClick={handleAddToCart}
            disabled={isAdded}
            style={{ 
              backgroundColor: isAdded ? '#6c757d' : '',
              cursor: isAdded ? 'not-allowed' : 'pointer'
            }}
          >
            {isAdded ? '¡Producto agregado!' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </section>
  );
}