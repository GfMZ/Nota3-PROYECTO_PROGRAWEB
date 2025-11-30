import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailView from '../components/ProductDetailView';
import SimilarProducts from '../components/SimilarProducts';
// Importamos el servicio real
import { fetchProductById } from '../services/productService';

export default function ProductDetailPage() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {

        const data = await fetchProductById(productId);
        

        const formattedProduct = {
            ...data,
            id: data._id || data.id, 

            category: data.category?.name || data.category || 'General' 
        };
        
        setProduct(formattedProduct);
      } catch (err) {
        console.error(err);
        setError("Producto no encontrado o error de conexión.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) loadProduct();
  }, [productId]);

  if (isLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando detalles...</div>;
  }

  if (error || !product) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>{error || "Producto no encontrado"}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <ProductDetailView product={product} />
      
      <SimilarProducts products={[]} /> 
    </div>
  );
}