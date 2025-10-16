import React from 'react';
import OrderSummary from '../components/OrderSummary';
import qrImage from '../img/qr_scan_me.jpg';
import paymentMethodsImage from '../img/payment-methods.jpg';

export default function CheckoutPaymentPage() {
  const paymentOptionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const imageStyle = {
    height: '160px',
    width: 'auto',
    objectFit: 'contain',
    marginLeft: 'auto'
  };
  
  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Método de pago</h3>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={paymentOptionStyle}>
              <input type="radio" name="payment" id="qr" />
              <label htmlFor="qr">Generar QR</label>
              <img src={qrImage} alt="Código QR" style={imageStyle} />
            </div>
            <div style={paymentOptionStyle}>
              <input type="radio" name="payment" id="cards" />
              <label htmlFor="cards">Tarjetas de Crédito/Débito y otros</label>
              <img src={paymentMethodsImage} alt="Métodos de pago" style={imageStyle} />
            </div>
            <button style={{ display: 'block', width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: 'var(--green)', color: 'white', textAlign: 'center', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Pagar S/ 100.00
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}