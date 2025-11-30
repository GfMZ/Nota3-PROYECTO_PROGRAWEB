import jwt from 'jsonwebtoken';
import User from '../Models/Users.js'; // <-- Apunta a Users.js

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Cargamos el usuario con el hash de contraseña (para matchPassword)
      req.user = await User.findByPk(decoded.id); 

      if (!req.user) return res.status(401).json({ message: 'Usuario no encontrado' });
      
      // --- RESTRICCIÓN DE BLOQUEO AÑADIDA ---
      if (req.user.isBlocked) {
          // Si el usuario está bloqueado, negamos el acceso inmediatamente
          return res.status(403).json({ message: 'Su cuenta ha sido BLOQUEADA por la administración.' });
      }
      // ------------------------------------
      
      next();
    } catch (error) {
      // Nota: Si el token es inválido o expiró, cae aquí.
      res.status(401).json({ message: 'Token no válido' });
    }
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
};

export const admin = (req, res, next) => {
  // Nota: Este middleware asume que el usuario ya pasó la comprobación de 'isBlocked' en 'protect'
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin requerido' });
};