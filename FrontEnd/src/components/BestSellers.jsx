import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/productService'; 

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        const allProducts = await fetchProducts();

        setProducts(allProducts.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar best sellers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBestSellers();
  }, []);

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando ofertas...</div>;
  }

  return (
    <section className="gp-bestsellers">
      <h3>Lo más vendido</h3>
      <div className="bestsellers-grid">
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