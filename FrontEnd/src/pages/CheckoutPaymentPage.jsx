import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Importar AuthContext
import OrderSummary from '../components/OrderSummary';
import { createOrder } from '../services/orderService'; 

import qrImage from '../img/qr_scan_me.jpg';
import paymentMethodsImage from '../img/payment-methods.jpg';

export default function CheckoutPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { cart, totalPrice, shippingAddress, clearCart } = useCart();
  const { getAuthHeader, user } = useAuth(); // 2. Obtener la función del token
  const navigate = useNavigate();
  
  const discount = 9.00;
  const finalTotal = totalPrice > 0 ? totalPrice - discount : 0;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }
    // Verificación extra de seguridad
    if (!user) {
        alert("Debes iniciar sesión para realizar una compra.");
        navigate('/login');
        return;
    }
    
    if (isProcessing) return;
    setIsProcessing(true);

    try {
        const orderItems = cart.map(item => ({
            product: item.productId || item.id,
            name: item.name,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            price: item.price,
        }));
        
        const orderPayload = {
            orderItems: orderItems,
            shippingAddress: shippingAddress || { address: 'Dirección no especificada' },
            paymentMethod: selectedMethod,
            totalPrice: finalTotal,
        };
        
        // 3. PASAR EL TOKEN (getAuthHeader()) COMO SEGUNDO ARGUMENTO
        const createdOrder = await createOrder(orderPayload, getAuthHeader());

        clearCart(); 
        navigate('/orden/completada', { state: { orderedItems: createdOrder.orderItems } });

    } catch (error) {
        alert(`Error al procesar el pago: ${error.message}`);
        console.error('Error de checkout:', error);
    } finally {
        setIsProcessing(false);
    }
  };

  // ... (El resto del código JSX y estilos se mantiene IGUAL) ...
  // Solo asegúrate de copiar el return que ya tenías.
  
  // (Para ahorrar espacio, mantengo el return implícito aquí, usa el de tu archivo actual)
  const baseButtonStyle = { display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', border: '2px solid #eee', borderRadius: '8px', marginBottom: '1rem', cursor: 'pointer', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' };
  const selectedButtonStyle = { borderColor: 'var(--green)', boxShadow: '0 4px 12px rgba(46, 155, 31, 0.2)' };

  return (
    <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2, border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Método de pago</h3>
          <div style={{ marginTop: '1.5rem' }}>
            
            <div style={{ ...baseButtonStyle, ...(selectedMethod === 'qr' ? selectedButtonStyle : {}) }} onClick={() => setSelectedMethod('qr')}>
              <div style={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: '600' }}>Generar QR</div>
              <div style={{ width: '200px', textAlign: 'right' }}><img src={qrImage} alt="QR" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            </div>

            <div style={{ ...baseButtonStyle, ...(selectedMethod === 'tarjeta' ? selectedButtonStyle : {}) }} onClick={() => setSelectedMethod('tarjeta')}>
              <div style={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: '600' }}>Tarjetas y otros</div>
              <div style={{ width: '200px', textAlign: 'right' }}><img src={paymentMethodsImage} alt="Tarjetas" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            </div>

            <button onClick={handlePayment} disabled={!selectedMethod || isProcessing} style={{ display: 'block', width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: (selectedMethod && !isProcessing) ? 'var(--green)' : '#ccc', color: 'white', textAlign: 'center', borderRadius: '8px', border: 'none', cursor: (selectedMethod && !isProcessing) ? 'pointer' : 'not-allowed', fontSize: '1.1rem' }}>
              {isProcessing ? 'PROCESANDO...' : `Pagar S/ ${finalTotal.toFixed(2)}`}
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}><OrderSummary /></div>
      </div>
    </div>
  );
}