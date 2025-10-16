import React, { useState, createContext, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId, amount) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };
  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    shippingAddress,
    setShippingAddress
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}