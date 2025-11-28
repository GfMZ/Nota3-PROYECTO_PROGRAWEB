import React from 'react';


const bannerImage = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

export default function AboutPage() {
  const styles = {
    container: {
      fontFamily: 'Inter, sans-serif',
      color: '#333',
    },
    heroSection: {
      width: '100%',
      height: '400px', 
      backgroundImage: `url(${bannerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    heroTitle: {
      position: 'relative',
      color: 'white',
      fontSize: '3rem',
      fontWeight: 'bold',
      zIndex: 1,
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    contentSection: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '4rem 2rem',
      textAlign: 'center',
      lineHeight: '1.8',
    },
    subTitle: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#2e9b1f', 
    },
    text: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '1rem',
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <h1 style={styles.heroTitle}>Sobre Nosotros</h1>
      </div>

      
      <div style={styles.contentSection}>
        <h2 style={styles.subTitle}>Pasión por el Gaming</h2>
        <p style={styles.text}>
          En <strong>GamePlay</strong>, no solo vendemos videojuegos y consolas; vivimos la experiencia. Fundada en 2024, nuestra misión es conectar a los jugadores de todo el país con la mejor tecnología y entretenimiento disponible en el mercado.
        </p>
        <p style={styles.text}>
          Creemos que el gaming es más que un pasatiempo; es una forma de arte, una comunidad y un estilo de vida. Por eso, nos esforzamos por ofrecer un catálogo curado con los últimos lanzamientos, periféricos de alta gama y coleccionables exclusivos, todo respaldado por un servicio al cliente que entiende tus necesidades.
        </p>
        <p style={styles.text}>
          Ya seas un jugador casual o un competidor de eSports, GamePlay es tu aliado para llevar tu experiencia al siguiente nivel.
        </p>
      </div>
    </div>
  );
}