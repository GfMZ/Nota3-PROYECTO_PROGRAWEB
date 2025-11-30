import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Inicializamos leyendo 'userInfo' (estándar para guardar sesión)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('userInfo');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    // Sincronizar con localStorage cada vez que 'user' cambie
    useEffect(() => {
        if (user) {
            localStorage.setItem('userInfo', JSON.stringify(user));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [user]);

    // --- Login ---
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            // data incluye: { _id, name, email, token, role }
            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || 'Error de conexión.' };
        }
    };

    // --- Registro ---
    const register = async (name, email, password, country) => {
        try {
            const data = await registerUser(name, email, password, country);
            setUser(data);
            return { success: true, message: "Registro exitoso." };
        } catch (error) {
            return { success: false, message: error.message || 'Error en el registro.' };
        }
    };

    // --- Logout ---
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems'); // Limpiamos carrito local también
        window.location.href = '/login'; // Recarga forzada para limpiar estados
    };

    // --- Obtener Header para Peticiones Protegidas ---
    const getAuthHeader = () => {
        if (user && user.token) {
            return { 'Authorization': `Bearer ${user.token}` };
        } else {
            return {};
        }
    };

    const value = {
        user,
        login,
        logout,
        register,      
        getAuthHeader,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);