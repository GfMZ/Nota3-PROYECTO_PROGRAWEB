import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/productService'; 


const placeHolderImages = [
  'https://placehold.co/400x300/2e9b1f/ffffff?text=Series+A',
  'https://placehold.co/400x300/3b82f6/ffffff?text=Series+B',
  'https://placehold.co/400x300/f59e0b/ffffff?text=Series+C'
];

export default function NewSeries() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const categories = await fetchCategories();
        
        setSeries(categories.slice(0, 3));
      } catch (error) {
        console.error("Error cargando series:", error);
      }
    };
    loadSeries();
  }, []);

  if (series.length === 0) return null;

  return (
    <section className="gp-newseries">
      <h3>Series destacadas</h3>
      <div className="series-row">
        {series.map((item, index) => (
          <div className="series-card" key={item._id}>
            <div className="series-image">
                
                <img 
                    src={placeHolderImages[index % placeHolderImages.length]} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                />
            </div>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}