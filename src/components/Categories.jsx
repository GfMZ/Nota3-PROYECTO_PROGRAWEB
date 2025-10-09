
import React from 'react';

import cat1 from '../img/videojuegos.jpg';
import cat2 from '../img/consolas.jpg';
import cat3 from '../img/perifericos.jpg';


const categories = [
  { id: 1, title: 'Videojuegos', image: cat1 },
  { id: 2, title: 'Consolas', image: cat2 },
  { id: 3, title: 'Periféricos', image: cat3 },
];

export default function Categories() {
  return (
    <section className="gp-categories">
      <h3>Explora las categorías</h3>
      <div className="cats-row">
        {categories.map((cat) => (
          <div key={cat.id} className="cat-card">
            <div className="cat-circle">
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
