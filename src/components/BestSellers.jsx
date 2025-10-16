import React from 'react';


import productoImg1 from '../img/play5.jpg'; 
import productoImg2 from '../img/gow.jpg'; 
import productoImg3 from '../img/G502.jpg'; 
import productoImg4 from '../img/spidermanfunko.jpg'; 


const items = [
  {
    id: 1,
    name: 'PlayStation 5',
    category: 'Consolas',
    price: 'S/ 2299.90',
    image: productoImg1 
  },
  {
    id: 2,
    name: 'God Of War Ragnarok',
    category: 'Videojuegos',
    price: 'S/ 149.90',
    image: productoImg2 
  },
  {
    id: 3,
    name: 'Mouse Logitech G502',
    category: 'Periféricos',
    price: 'S/ 335.90',
    image: productoImg3 
  },
  {
    id: 4,
    name: 'Funko Pop Spiderman',
    category: 'Videojuegos',
    price: 'S/ 59.90',
    image: productoImg4 
  },

  
];

export default function BestSellers() {
  return (
    <section className="gp-bestsellers">
      <h3>Lo más vendido</h3>
      <div className="bestsellers-grid">
        {items.map(it => (
          <article key={it.id} className="product-card">
            <div className="product-image">
              <img 
                src={it.image} 
                alt={it.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} 
              />
            </div>
            <h4 className="product-title">{it.name}</h4>
            <p className="product-category">{it.category}</p>
            <p className="product-price">{it.price}</p>
            <button className="btn-add small">AGREGAR</button>
          </article>
        ))}
      </div>
    </section>
  );
}