// src/services/authService.js

const API_BASE_URL = 'http://localhost:4000/api/auth';


export const registerUser = async (name, email, password, country) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, country }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en el registro de usuario.');
    }

    return data; 
};


export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error de credenciales.');
    }

    return data; 
};