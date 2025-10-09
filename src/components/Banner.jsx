import React from 'react';
import banner1 from '../img/tlou2.jpg';

export default function Banner() {
  return (
    <section className="gp-banner">
      <div className="gp-banner-inner">
        <div className="banner-image">
            <img
            src={banner1}
            alt="Banner principal"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
          />  
        </div>

        <div className="banner-content">
          <h2>The Last Of Us Part II / Remastered (PS5)</h2>
          <p className="price">S/ 119.90 <span className="old">S/ 199.90</span></p>
          <button className="btn-add">Añadir al carrito</button>
        </div>
      </div>
    </section>
  );
}
