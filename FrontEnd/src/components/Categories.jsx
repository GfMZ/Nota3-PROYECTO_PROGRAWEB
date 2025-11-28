import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/productService'; 
import { Link } from 'react-router-dom'; 


import cat1 from '../img/videojuegos.jpg';
import cat2 from '../img/consolas.jpg';
import cat3 from '../img/perifericos.jpg';
import placeholder from '../img/LogotipoGamePlace.jpg'; 


const categoryImages = {
  'Videojuegos': cat1,
  'Consolas': cat2,
  'Periféricos': cat3,
};

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías en Home:", error);
      }
    };
    loadCategories();
  }, []);

  return (
    <section className="gp-categories">
      <h3>Explora las categorías</h3>
      <div className="cats-row">
        {categories.map((cat) => {
          
          const imageSrc = categoryImages[cat.name] || placeholder;
          
          return (
            <Link 
                key={cat._id} 
                to={`/search?category=${cat.name}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <div className="cat-card">
                <div className="cat-circle">
                    <img
                    src={imageSrc}
                    alt={cat.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                    />
                </div>
                <p>{cat.name}</p>
                </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}