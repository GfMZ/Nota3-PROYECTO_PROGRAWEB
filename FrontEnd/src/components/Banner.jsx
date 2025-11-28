import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/productService';

import bannerFallback from '../img/tlou2.jpg'; 

export default function Banner() {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [bannerProduct, setBannerProduct] = useState(null);


  useEffect(() => {
    const loadFeaturedProduct = async () => {
      try {
        const products = await fetchProducts();
        // Buscamos un producto específico por nombre, o tomamos el primero
        const featured = products.find(p => p.name.includes('The Last')) || products[0];
        
        if (featured) {
            setBannerProduct({
                ...featured,
                id: featured._id, 
                
                 
            });
        }
      } catch (error) {
        console.error("Error cargando producto del banner", error);
      }
    };
    loadFeaturedProduct();
  }, []);

  const handleAddToCart = () => {
    if (isAdded || !bannerProduct) return;

    
    const productToAdd = {
        id: bannerProduct.id,
        productId: bannerProduct.id,
        name: bannerProduct.name,
        price: bannerProduct.price,
        imageUrl: bannerProduct.imageUrl,
        quantity: 1
    };

    addToCart(productToAdd);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (!bannerProduct) {
      return null; 
  }

  return (
    <section className="gp-banner">
      <div className="gp-banner-inner">
        <div className="banner-image">
            <img
            src={bannerProduct.imageUrl || bannerFallback}
            alt="Banner principal"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
          />  
        </div>

        <div className="banner-content">
          <h2>{bannerProduct.name}</h2>
          <p className="price">
            S/ {bannerProduct.price.toFixed(2)} 
            
            <span className="old">S/ {(bannerProduct.price * 1.2).toFixed(2)}</span>
          </p>
          <p>{bannerProduct.description}</p> 
          
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