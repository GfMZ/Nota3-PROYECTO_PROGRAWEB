import React, { createContext, useContext, useState, useEffect } from 'react';

import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });


    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // --- Función de Login ---
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password); 
            setUser(data); 
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || 'Error de conexión.' };
        }
    };

    // --- Función de Registro ---
    const register = async (name, email, password, country) => {
        try {

            const data = await registerUser(name, email, password, country);
            
            // Guardar usuario en estado
            setUser(data);
            return { success: true, message: "Registro exitoso." };
        } catch (error) {
            return { success: false, message: error.message || 'Error en el registro.' };
        }
    };

    // --- Logout ---
    const logout = () => {
        setUser(null);
    };
    

    const getAuthHeader = () => {
        return user ? { 'Authorization': `Bearer ${user.token}` } : {};
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

export const useAuth = () => {
    return useContext(AuthContext);
};