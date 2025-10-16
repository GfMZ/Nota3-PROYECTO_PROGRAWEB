import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';

export default function CheckoutAddressPage() {
  const [address, setAddress] = useState('');
  const { setShippingAddress } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Por favor, ingresa una dirección de envío.');
      return;
    }
    setShippingAddress({ address });
    navigate('/checkout/pago');
  };

  const formInputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '0.25rem',
    marginBottom: '1rem'
  };

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Dirección de envío</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre del usuario"
                  style={formInputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="apellido">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Apellido del usuario"
                  style={formInputStyle}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa tu dirección"
                style={formInputStyle}
              />
            </div>
            
            <button type="submit" style={{ display: 'block', width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: 'var(--green)', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Seleccionar método de pago
            </button>
          </form>
        </div>
        <div style={{ flex: 1 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}