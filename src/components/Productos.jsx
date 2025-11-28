import React, { useState } from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Productos() {
  const productosPorCategoria = {
    "Videojuegos": [
      { id: 1, nombre: "RDR2 Juego PS4", precio: 189, imagen: "https://gamescenter.pe/wp-content/uploads/2024/08/RDR2.jpg" },
      { id: 2, nombre: "Hollow Knight PS4", precio: 179, imagen: "https://storegamesperu.com/files/images/productos/1647045653-hollow-knight-voidheart-edition-ps4.jpg" },
      { id: 3, nombre: "Spiderman PS4", precio: 189, imagen: "https://www.storegamesperu.com/files/images/productos/1648771273-marvel-spider-man-ps4-0.jpg" },
      { id: 4, nombre: "Madden 25 PS4", precio: 179, imagen: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/119/PMP20000532533/full_image-1.jpeg" },
    ],
    "Consolas": [
      { id: 5, nombre: "PlayStation 5", precio: 2999, imagen: "https://m.media-amazon.com/images/I/61i2UsQOMWL._AC_SL1500_.jpg" },
      { id: 6, nombre: "Xbox Series X", precio: 2799, imagen: "https://m.media-amazon.com/images/I/71NBQ2a52CL._AC_SL1500_.jpg" },
      { id: 7, nombre: "Nintendo Switch OLED", precio: 1899, imagen: "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg" },
      { id: 8, nombre: "PlayStation 4 Slim", precio: 1599, imagen: "https://m.media-amazon.com/images/I/71aXzv34N5L._AC_SL1500_.jpg" },
    ],
    "Merch": [
      { id: 9, nombre: "Polo The Last of Us", precio: 79, imagen: "https://m.media-amazon.com/images/I/61MuFtwgM7L._AC_SL1500_.jpg" },
      { id: 10, nombre: "Gorra Halo Infinite", precio: 59, imagen: "https://m.media-amazon.com/images/I/71Z7tRzFGsL._AC_SL1500_.jpg" },
      { id: 11, nombre: "Taza Call of Duty", precio: 49, imagen: "https://m.media-amazon.com/images/I/61NOg4h8MEL._AC_SL1500_.jpg" },
      { id: 12, nombre: "Poster Spiderman PS5", precio: 45, imagen: "https://m.media-amazon.com/images/I/71RL9FzdpjL._AC_SL1500_.jpg" },
    ],
  };

  const { addToCart } = useCart();
  const [categoriaActiva, setCategoriaActiva] = useState("Videojuegos");
  const [addedProductId, setAddedProductId] = useState(null);

  const categorias = Object.keys(productosPorCategoria);

  const handleProductAdd = (productToAdd) => {
    if (addedProductId === productToAdd.id) return;

    const cartProduct = {
      id: productToAdd.id,
      name: productToAdd.nombre,
      price: productToAdd.precio,
      imageUrl: productToAdd.imagen,
      category: categoriaActiva
    };

    addToCart(cartProduct);
    setAddedProductId(productToAdd.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <section style={{ display: "flex", padding: "2rem" }}>
      <aside
        style={{
          width: "220px",
          borderRight: "1px solid #ddd",
          paddingRight: "1rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Categorías</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categorias.map((cat) => (
            <li key={cat} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  width: "100%",
                  backgroundColor: categoriaActiva === cat ? "#4CAF50" : "#fff",
                  color: categoriaActiva === cat ? "#fff" : "#333",
                  border: "1px solid #4CAF50",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div style={{ flex: 1, paddingLeft: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>{categoriaActiva}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {productosPorCategoria[categoriaActiva].map((p) => {
            const isAdded = addedProductId === p.id;
            return (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "1rem",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h4 style={{ marginBottom: "5px" }}>{p.nombre}</h4>
                <p style={{ color: "#666", marginBottom: "5px" }}>
                  {categoriaActiva}
                </p>
                <p style={{ fontWeight: "bold", color: "#2E7D32" }}>
                  S/{p.precio}
                </p>
                <button 
                  className="btn-add" 
                  onClick={() => handleProductAdd(p)}
                  disabled={isAdded}
                  style={{ 
                    backgroundColor: isAdded ? '#6c757d' : '',
                    cursor: isAdded ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAdded ? '¡Producto agregado!' : 'AGREGAR'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}