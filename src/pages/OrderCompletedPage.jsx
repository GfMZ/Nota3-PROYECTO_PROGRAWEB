import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function OrderCompletedPage() {
  const location = useLocation();
  const { orderedItems } = location.state || { orderedItems: [] };
  const { shippingAddress, clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  const totalPrice = orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <h1>Orden completada :)</h1>
        <span style={{ color: 'green', fontSize: '2rem' }}>✓</span>
      </div>
      <p>¡Gracias por tu compra!</p>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '2rem' }}>
        <div style={{ flex: 2 }}>
          <h3>Resumen de la compra</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {orderedItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '1rem' }} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                </div>
                <p>Cantidad: {item.quantity}</p>
                <p style={{ minWidth: '100px', textAlign: 'right', fontWeight: 'bold' }}>S/ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Resumen del Pago</h3>
            <p>Total Pagado: S/ {totalPrice.toFixed(2)}</p>
          </div>
          <div style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Dirección de envío</h3>
            <p>{shippingAddress?.address || 'No especificada'}</p>
            <p><strong>Fecha de entrega aproximada: 16/10/2025</strong></p>
          </div>
          <Link to="/" style={{ display: 'block', width: '100%', padding: '1rem', backgroundColor: 'var(--green)', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '8px' }}>
            Ver más ofertas
          </Link>
        </div>
      </div>
    </div>
  );
}