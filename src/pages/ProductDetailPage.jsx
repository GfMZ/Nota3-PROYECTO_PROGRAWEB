import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailView from '../components/ProductDetailView';
import SimilarProducts from '../components/SimilarProducts';

// --- Datos simulados para demostración (eventualmente del API) ---
const mockProducts = [
  { 
    id: '1', 
    name: "RDR2 Juego PS4", 
    category: "Videojuegos", 
    price: 189.00, 
    imageUrl: "/src/img/RDR2.jpg",
    description: "Sumérgete en el vasto y envolvente mundo del Salvaje Oeste con Red Dead Redemption 2. Una épica historia de honor, lealtad y redención en los últimos días de la era de los forajidos."
  },
  { 
    id: '2', 
    name: "Hollow Knight PS4", 
    category: "Videojuegos", 
    price: 179.00, 
    imageUrl: "https://storegamesperu.com/files/images/productos/1647045653-hollow-knight-voidheart-edition-ps4.jpg",
    description: "Explora un vasto reino interconectado en Hollow Knight. Descubre cavernas serpenteantes, ciudades antiguas y ruinas mortales, luchando contra criaturas contaminadas y haciendo amistad con extraños bichos."
  },
  { 
    id: '3', 
    name: "Spiderman PS4", 
    category: "Videojuegos", 
    price: 189.00, 
    imageUrl: "https://www.storegamesperu.com/files/images/productos/1648771273-marvel-spider-man-ps4-0.jpg",
    description: "Sé Spider-Man en una historia original llena de acción. Con el icónico héroe, enfrenta a los villanos más notorios de Marvel y protege la ciudad de Nueva York."
  },
  { 
    id: '4', 
    name: "Madden 25 PS4", 
    category: "Videojuegos", 
    price: 179.00, 
    imageUrl: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/119/PMP20000532533/full_image-1.jpeg",
    description: "Siente el impacto de cada jugada con la nueva tecnología de placaje. Madden 25 te trae la experiencia más realista del fútbol americano."
  },
  { 
    id: '5', 
    name: "The Last of Us Part II", 
    price: 119.90, 
    category: 'Videojuegos', 
    brand: 'Sony', 
    imageUrl: '/src/img/tlou2.jpg',
    description: "Cinco años después de su peligroso viaje a través de unos Estados Unidos postpandémicos, Ellie y Joel se han asentado en Jackson, Wyoming. Una historia de venganza y supervivencia."
  },
  { 
    id: '6', 
    name: "Funko Pop Spiderman", 
    price: 59.90, 
    category: 'Coleccionables', 
    brand: 'Funko', 
    imageUrl: '/src/img/spidermanfunko.jpg',
    description: "Llévate a casa al amigable vecino Spider-Man con este increíble Funko Pop. Una pieza esencial para cualquier coleccionista de Marvel."
  },
  { 
    id: '7', 
    name: "Mouse Logitech G502", 
    price: 335.90, 
    category: 'Periféricos', 
    brand: 'Logitech', 
    imageUrl: '/src/img/G502.JPG',
    description: "Experimenta un rendimiento de juego de alta precisión con el G502 HERO. Equipado con el sensor HERO 25K, 11 botones programables e iluminación RGB."
  },
  { 
    id: '101', 
    name: "Call of Duty Black Ops 7 - PlayStation 5", 
    category: "Guerra", 
    price: 199.00, 
    imageUrl: "https://m.media-amazon.com/images/I/71x5wM2rK+L._AC_SL1500_.jpg",
    description: "In Call of Duty Black Ops 7 on PS5, Treyarch and Raven Software are bringing players the most mind-bending Black Ops ever. The year is 2035 and the world is on the brink of chaos, ravaged by vicious factions and technological warfare."
  }
];
// -----------------------------------------------------------------

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId);
      setProduct(foundProduct);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando detalles del producto...</div>;
  }

  if (!product) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Producto no encontrado.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <ProductDetailView product={product} />
      <SimilarProducts />
    </div>
  );
}