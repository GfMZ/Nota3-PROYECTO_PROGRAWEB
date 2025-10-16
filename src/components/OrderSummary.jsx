import React from 'react';
import { useCart } from '../context/CartContext';

export default function OrderSummary() {
  const { cart, totalPrice } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryCostText = "GRATIS";
  const discount = 9.00; // Esto puede ser dinámico en el futuro
  const finalTotal = totalPrice - discount;

  return (
    <div style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
      <h3>Resumen de la compra</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <span>Productos ({totalItems})</span>
        <span>S/ {totalPrice.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <span>Delivery</span>
        <span style={{ color: 'green' }}>{deliveryCostText}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <span>Descuentos</span>
        <span style={{ color: 'red' }}>-S/ {discount.toFixed(2)}</span>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', margin: '1rem 0' }}>
        <span>Total</span>
        <span>S/ {finalTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}