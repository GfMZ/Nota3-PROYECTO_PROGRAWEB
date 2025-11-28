import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailView from '../components/ProductDetailView';
import SimilarProducts from '../components/SimilarProducts';
// Importar servicio
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
        // Llamada real al backend
        const data = await fetchProductById(productId);
        
        // Formatear datos para la vista
        const formattedProduct = {
            ...data,
            id: data._id, // Importante para el carrito
            category: data.category?.name || 'General'
        };
        setProduct(formattedProduct);
        
      } catch (err) {
        setError("Producto no encontrado o error de conexión.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>;
  if (error || !product) return <div style={{ padding: '2rem', textAlign: 'center' }}>{error || "Producto no encontrado"}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <ProductDetailView product={product} />
      {/* Pasamos array vacío a similares por ahora, o podrías cargar productos de la misma categoría */}
      <SimilarProducts products={[]} />
    </div>
  );
}