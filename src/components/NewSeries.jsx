import React from 'react';

const series = [
  { id: 1, title: 'Serie A', image: 'Imagen #17' },
  { id: 2, title: 'Serie B', image: 'Imagen #18' },
  { id: 3, title: 'Serie C', image: 'Imagen #19' },
];

export default function NewSeries() {
  return (
    <section className="gp-newseries">
      <h3>Series nuevas</h3>
      <div className="series-row">
        {series.map(s => (
          <div className="series-card" key={s.id}>
            <div className="series-image">{s.image}</div>
            <h4>{s.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
