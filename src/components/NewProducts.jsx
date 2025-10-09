import React from 'react';

const newprods = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Nuevo ${i + 1}`,
  price: `S/ ${149 + i}`,
  image: `Imagen #${20 + i}`
}));

export default function NewProducts() {
  return (
    <section className="gp-newproducts">
      <h3>Productos nuevos</h3>
      <div className="newprods-grid">
        {newprods.map(p => (
          <div className="product-mini" key={p.id}>
            <div className="mini-image">{p.image}</div>
            <h5>{p.name}</h5>
            <p className="product-price">{p.price}</p>
            <button className="btn-add small">AGREGAR</button>
          </div>
        ))}
      </div>
    </section>
  );
}
