import React from 'react';
import ProductCard from './ProductCard';

import productoImg1 from '../img/play5.jpg'; 
import productoImg2 from '../img/gow.jpg'; 
import productoImg3 from '../img/G502.jpg'; 
import productoImg4 from '../img/spidermanfunko.jpg'; 

const bestSellersData = [
  {
    id: 1,
    name: 'PlayStation 5',
    category: 'Consolas',
    price: 2299.90,
    imageUrl: productoImg1 
  },
  {
    id: 2,
    name: 'God Of War Ragnarok',
    category: 'Videojuegos',
    price: 149.90,
    imageUrl: productoImg2 
  },
  {
    id: 3,
    name: 'Mouse Logitech G502',
    category: 'Periféricos',
    price: 335.90,
    imageUrl: productoImg3 
  },
  {
    id: 4,
    name: 'Funko Pop Spiderman',
    category: 'Videojuegos',
    price: 59.90,
    imageUrl: productoImg4 
  },
];

export default function BestSellers() {
  return (
    <section className="gp-bestsellers">
      <h3>Lo más vendido</h3>
      <div className="bestsellers-grid">
        {bestSellersData.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}