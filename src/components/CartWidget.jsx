import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartWidget() {
  const { cart, totalPrice } = useCart();
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <Link to="/carro" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="gp-cart" aria-hidden>
        <div>Carrito 🛒({itemCount})</div>
        <div className="cart-amount">S/ {totalPrice.toFixed(2)}</div>
      </div>
    </Link>
  );
}