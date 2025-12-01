import jwt from 'jsonwebtoken';
import User from '../Models/Users.js'; 

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      

      req.user = await User.findByPk(decoded.id); 

      if (!req.user) return res.status(401).json({ message: 'Usuario no encontrado' });
      

      if (req.user.isBlocked) {
          
          return res.status(403).json({ message: 'Su cuenta ha sido BLOQUEADA por la administración.' });
      }
      
      
      next();
    } catch (error) {
      
      res.status(401).json({ message: 'Token no válido' });
    }
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
};

export const admin = (req, res, next) => {
  
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin requerido' });
};