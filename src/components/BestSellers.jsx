import React from 'react';

const items = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  category: i % 2 === 0 ? 'Videojuegos' : 'Coleccionables',
  price: `S/ ${199 + i}`,
  image: `Imagen #${5 + i}`
}));

export default function BestSellers() {
  return (
    <section className="gp-bestsellers">
      <h3>Lo más vendido</h3>
      <div className="bestsellers-grid">
        {items.map(it => (
          <article key={it.id} className="product-card">
            <div className="product-image">{it.image}</div>
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
