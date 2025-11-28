import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; 
import { fetchProducts } from '../services/productService'; 

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNewProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        
        
        setProducts(allProducts.slice(0, 6)); 
      } catch (error) {
        console.error("Error al cargar productos nuevos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNewProducts();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando novedades...</div>;
  }

  
  if (products.length === 0) return null;

  return (
    <section className="gp-newproducts">
      <h3>Productos nuevos</h3>
      <div className="newprods-grid">
        {products.map(product => (
          
          <ProductCard 
            key={product._id} 
            product={{ 
                ...product, 
                id: product._id 
            }} 
          />
        ))}
      </div>
    </section>
  );
}