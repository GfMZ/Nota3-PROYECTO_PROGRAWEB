import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function CartWidget() {
  const { cart, totalPrice } = useCart();
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const cartButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--green)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer'
  };

  return (
    <Link to="/carro" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={cartButtonStyle}>
        <ShoppingCart size={20} />
        <span>Carrito ({itemCount}) S/ {totalPrice.toFixed(2)}</span>
      </div>
    </Link>
  );
}