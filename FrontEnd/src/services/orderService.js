
const API_BASE_URL = 'http://localhost:4000/api/orders';


export const createOrder = async (orderPayload, authHeader) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader 
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al crear la orden.');
        }

        return data; 
    } catch (error) {
        console.error("Error de API - createOrder:", error);
        throw error;
    }
};


export const fetchMyOrders = async (authHeader) => {
    try {
        const response = await fetch(`${API_BASE_URL}/myorders`, {
            headers: authHeader
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener el historial de órdenes.');
        }

        return data; 
    } catch (error) {
        console.error("Error de API - fetchMyOrders:", error);
        throw error;
    }
};


export const fetchOrderById = async (orderId, authHeader) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${orderId}`, {
            headers: authHeader
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener la orden.');
        }

        return data; 
    } catch (error) {
        console.error("Error de API - fetchOrderById:", error);
        throw error;
    }
};