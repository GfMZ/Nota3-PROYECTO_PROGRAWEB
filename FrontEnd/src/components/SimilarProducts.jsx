import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: { marginTop: '40px', },
  title: { fontSize: '20px', fontWeight: '600', marginBottom: '16px', },
  grid: { display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', },
  card: { flex: '0 0 180px', border: '1px solid #eee', borderRadius: '8px', padding: '12px', textAlign: 'left', backgroundColor: '#fff', textDecoration: 'none', color: 'inherit', },
  image: { width: '100%', height: '140px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#f3f3f3', marginBottom: '8px', },
  productName: { fontSize: '14px', fontWeight: '600', },
  productCategory: { fontSize: '12px', color: '#777', },
  productPrice: { fontSize: '14px', fontWeight: 'bold', color: '#2e9b1f', }
};

export default function SimilarProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Productos similares</h3>
      <div style={styles.grid}>
        {products.map(product => {
            // Extracción segura del nombre de categoría
            const catName = product.category?.name || product.category || '';
            
            return (
              <Link to={`/producto/${product.id || product._id}`} key={product.id || product._id} style={styles.card}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={styles.image} 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150?text=IMG" }}
                />
                <h4 style={styles.productName}>{product.name}</h4>
                {/* CORRECCIÓN AQUÍ */}
                <p style={styles.productCategory}>{catName}</p>
                <p style={styles.productPrice}>S/ {product.price?.toFixed(2)}</p>
              </Link>
            );
        })}
      </div>
    </div>
  );
}