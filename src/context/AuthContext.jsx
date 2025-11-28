import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (correo, contra) => {
    const adminUser = {
      correo: "admin@demo.com",
      contra: "admin123",
      nombre: "Admin",
      isAdmin: true
    };

    const regularUser = {
      correo: "usuario@demo.com",
      contra: "123456",
      nombre: "Usuario Demo",
      isAdmin: false
    };
    
    if (correo === adminUser.correo && contra === adminUser.contra) {
      setUser(adminUser);
      console.log("Inicio de sesión de ADMIN exitoso");
      return { success: true };
    }
    
    if (correo === regularUser.correo && contra === regularUser.contra) {
      setUser(regularUser);
      console.log("Inicio de sesión de USUARIO exitoso");
      return { success: true };
    }

    setUser(null);
    return { success: false, message: "Correo o contraseña incorrectos" };
  };

  const logout = () => {
    setUser(null);
    console.log("Usuario ha cerrado sesión");
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};