import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import qrCodeImage from '../img/qr_scan_me.jpg';

export default function PaymentConfirmationPage() {
  const { method } = useParams();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (method === 'qr' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, method]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = () => {
    navigate('/orden/completada', { state: { orderedItems: cart } });
  };

  const renderQRView = () => (
    <div style={{ textAlign: 'center' }}>
      <h2>Escanear QR</h2>
      <img src={qrCodeImage} alt="Código QR de pago" style={{ width: '250px', height: '250px', margin: '2rem auto', display: 'block' }} />
      <p>Válido por {formatTime(timeLeft)} minutos</p>
      <button onClick={handleConfirmPayment} className="btn-add" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
        Ya realicé el pago
      </button>
    </div>
  );

  const renderCardView = () => (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>Procesando pago con tarjeta...</h2>
      <p>Por favor, espere un momento.</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          {method === 'qr' ? renderQRView() : renderCardView()}
        </div>
        <div style={{ flex: 1 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}