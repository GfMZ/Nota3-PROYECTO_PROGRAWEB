import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
// Importamos los servicios para hablar con la Base de Datos
import { fetchUserCart, syncCartItem, clearServerCart } from '../services/cartService';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user, getAuthHeader } = useAuth();
  
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);

  // 1. CARGA INICIAL DEL CARRITO
  useEffect(() => {
    const loadCart = async () => {
        if (user) {
            // A) USUARIO LOGUEADO: Cargar desde PostgreSQL
            try {
                const serverData = await fetchUserCart(getAuthHeader());
                // El backend devuelve { items: [...] }
                setCart(serverData.items || []);
            } catch (error) {
                console.error("Error sync DB cart:", error);
            }
        } else {
            // B) INVITADO: Cargar desde LocalStorage
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) setCart(JSON.parse(storedCart));
        }
    };
    loadCart();
  }, [user]); // Se ejecuta al loguearse/desloguearse

  // Helper para guardar en localStorage solo si es invitado
  const saveLocal = (items) => {
    if (!user) localStorage.setItem('cartItems', JSON.stringify(items));
  };

  // --- AGREGAR ITEM ---
  const addToCart = async (product) => {
    // 1. Lógica Optimista (Actualiza UI inmediatamente)
    let newCart;
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    saveLocal(newCart);

    // 2. Sincronización con DB (Si hay usuario)
    if (user) {
        try {
            const qty = existing ? existing.quantity + 1 : 1;
            // Enviamos al backend: productId y la NUEVA cantidad total
            await syncCartItem(product.id, qty, getAuthHeader());
        } catch (error) {
            console.error("Error saving to DB:", error);
        }
    }
  };

  // --- REMOVER ITEM ---
  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    saveLocal(newCart);

    if (user) {
        try {
            // Cantidad 0 para que el backend lo borre
            await syncCartItem(productId, 0, getAuthHeader());
        } catch (error) { console.error(error); }
    }
  };

  // --- ACTUALIZAR CANTIDAD ---
  const updateQuantity = async (productId, amount) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const newQty = item.quantity + amount;
    if (newQty < 1) {
        removeFromCart(productId);
        return;
    }

    const newCart = cart.map(i => i.id === productId ? { ...i, quantity: newQty } : i);
    setCart(newCart);
    saveLocal(newCart);

    if (user) {
        try {
            await syncCartItem(productId, newQty, getAuthHeader());
        } catch (error) { console.error(error); }
    }
  };

  // --- LIMPIAR CARRITO ---
  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem('cartItems');
    if (user) {
        await clearServerCart(getAuthHeader());
    }
  };

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