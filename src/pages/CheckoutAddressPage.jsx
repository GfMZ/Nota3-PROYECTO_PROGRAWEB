import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';

export default function CheckoutAddressPage() {
  const formInputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '0.25rem'
  };

  const formGroupStyle = {
    marginBottom: '1rem'
  };

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Dirección de envío</h3>
          <form style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ ...formGroupStyle, flex: 1 }}>
                <label>Nombre</label>
                <input type="text" placeholder="Nombre del usuario" style={formInputStyle} />
              </div>
              <div style={{ ...formGroupStyle, flex: 1 }}>
                <label>Apellido</label>
                <input type="text" placeholder="Apellido del usuario" style={formInputStyle} />
              </div>
            </div>
            <div style={{ ...formGroupStyle }}>
              <label>Dirección</label>
              <input type="text" placeholder="Dirección de envío" style={formInputStyle} />
            </div>
            {/* Agrega los demás campos aquí si lo deseas */}
            <Link to="/checkout/pago" style={{ display: 'block', width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: 'var(--green)', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Seleccionar método de pago
            </Link>
          </form>
        </div>
        <div style={{ flex: 1 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}