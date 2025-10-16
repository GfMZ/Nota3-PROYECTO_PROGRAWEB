import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartWidget() {
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <div className="gp-cart" aria-hidden>
      <div>Carrito ({itemCount})</div>
    </div>
  );
}