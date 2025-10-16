import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="btn-add">Ver productos</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ flex: 2 }}>
        <h2>Carro ({cart.reduce((acc, item) => acc + item.quantity, 0)} productos)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '1rem' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: '0.25rem 0', color: 'green' }}>Llega mañana</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.25rem 0.5rem' }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.25rem 0.5rem' }}>+</button>
              </div>
              <p style={{ minWidth: '100px', textAlign: 'right', fontWeight: 'bold' }}>S/ {(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginLeft: '1rem', color: '#777' }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: 1, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
        <h3>Resumen de la compra</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
          <span>Productos ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
          <span>S/ {totalPrice.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
          <span>Delivery</span>
          <span style={{ color: 'green' }}>GRATIS</span>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', margin: '1rem 0' }}>
          <span>Total</span>
          <span>S/ {totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout/direccion" style={{ display: 'block', width: '100%', padding: '1rem', backgroundColor: 'var(--green)', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Continuar Compra
        </Link>
      </div>
    </div>
  );
}