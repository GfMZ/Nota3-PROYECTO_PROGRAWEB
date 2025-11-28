import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList'; // Reutilizamos tu lista de productos
import { fetchProducts } from '../services/productService';

// Imagen de banner para la sección de ofertas
const offerBanner = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop";

export default function OffersPage() {
  const [offerProducts, setOfferProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);
      try {
        const allProducts = await fetchProducts();
        
        // --- LÓGICA DE "OFERTAS REALES" ---
        // Filtramos productos que cumplan criterio de oferta:
        // Ej: Precio menor a 300 soles O que sean Coleccionables/Periféricos
        const deals = allProducts.filter(product => 
            product.price < 300 || 
            product.category?.name === 'Periféricos' ||
            product.category?.name === 'Coleccionables'
        );
        
        // Opcional: Mezclar los resultados para que varíen
        setOfferProducts(deals.sort(() => 0.5 - Math.random()));
        
      } catch (error) {
        console.error("Error cargando ofertas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, []);

  const styles = {
    hero: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${offerBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      marginBottom: '32px'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: 0,
      color: '#ffeb3b', // Amarillo oferta
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginTop: '10px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px 40px 20px'
    }
  };

  return (
    <div>
      {/* Banner de Cabecera */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>Flash Sale 🔥</h1>
          <p style={styles.heroSubtitle}>Descuentos increíbles en tus productos favoritos</p>
        </div>
      </div>

      <div style={styles.container}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>
            Buscando las mejores ofertas...
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#444' }}>
              Encontramos <strong>{offerProducts.length}</strong> productos en promoción hoy:
            </div>
            
            {/* Reutilizamos tu componente ProductList que ya funciona perfecto */}
            <ProductList products={offerProducts} />
          </>
        )}
      </div>
    </div>
  );
}