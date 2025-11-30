// src/services/cartService.js

const API_BASE_URL = 'http://localhost:4000/api/cart';

// Obtener carrito del servidor (al loguearse)
export const fetchUserCart = async (authHeader) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: authHeader
        });
        
        if (!response.ok) throw new Error('Error al obtener carrito.');
        
        // Tu controller devuelve { items: [...] }
        return response.json(); 
    } catch (error) {
        console.error("Error API cart:", error);
        throw error;
    }
};

// Agregar o Actualizar item en el servidor
// Nota: Tu backend espera { productId, quantity }
export const syncCartItem = async (productId, quantity, authHeader) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) throw new Error('Error sincronizando item.');
        return response.json();
    } catch (error) {
        console.error("Error syncCartItem:", error);
        throw error;
    }
};

// Vaciar carrito (ej: al comprar)
export const clearServerCart = async (authHeader) => {
    try {
        await fetch(API_BASE_URL, {
            method: 'DELETE',
            headers: authHeader
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};