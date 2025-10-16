import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import qrImage from '../img/qr_scan_me.jpg';
import paymentMethodsImage from '../img/payment-methods.jpg';

export default function CheckoutPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }
    
    if (selectedMethod === 'tarjeta') {
      navigate('/orden/completada');
    } else {
      navigate(`/checkout/confirmacion/${selectedMethod}`);
    }
  };

  const baseButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    border: '2px solid #eee',
    borderRadius: '8px',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const selectedButtonStyle = {
    borderColor: 'var(--green)',
    boxShadow: '0 4px 12px rgba(46, 155, 31, 0.2)',
  };

  const textContainerStyle = {
    flexGrow: 1,
    textAlign: 'left',
    fontSize: '1.2rem',
    fontWeight: '600',
  };

  const imageContainerStyle = {
    width: '200px',
    textAlign: 'right',
  };

  const imageStyle = {
    maxHeight: '100px',
    maxWidth: '100%',
    objectFit: 'contain',
  };
  
  const discount = 9.00;
  const finalTotal = totalPrice > 0 ? totalPrice - discount : 0;

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Método de pago</h3>
          <div style={{ marginTop: '1.5rem' }}>
            
            <div 
              style={{ ...baseButtonStyle, ...(selectedMethod === 'qr' ? selectedButtonStyle : {}) }}
              onClick={() => setSelectedMethod('qr')}
            >
              <div style={textContainerStyle}>Generar QR</div>
              <div style={imageContainerStyle}>
                <img src={qrImage} alt="Código QR" style={imageStyle} />
              </div>
            </div>

            <div 
              style={{ ...baseButtonStyle, ...(selectedMethod === 'tarjeta' ? selectedButtonStyle : {}) }}
              onClick={() => setSelectedMethod('tarjeta')}
            >
              <div style={textContainerStyle}>Tarjetas y otros</div>
              <div style={imageContainerStyle}>
                <img src={paymentMethodsImage} alt="Métodos de pago" style={imageStyle} />
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={!selectedMethod}
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '1rem', 
                marginTop: '1rem', 
                backgroundColor: selectedMethod ? 'var(--green)' : '#ccc', 
                color: 'white', 
                textAlign: 'center', 
                borderRadius: '8px', 
                border: 'none', 
                cursor: selectedMethod ? 'pointer' : 'not-allowed', 
                fontSize: '1.1rem' 
              }}
            >
              Pagar S/ {finalTotal.toFixed(2)}
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