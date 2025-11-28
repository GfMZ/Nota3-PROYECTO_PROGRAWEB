

import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];

            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            req.user = await User.findById(decoded.id).select('-password');
            
            
            next();
            
        } catch (error) {
            console.error(error);
            
            res.status(401).json({ message: 'Token inválido o expirado. Acceso no autorizado.' });
        }
    } else {
        
        res.status(401).json({ message: 'No autorizado, token no encontrado.' });
    }
};



export const admin = (req, res, next) => {
    
    if (req.user && req.user.role === 'admin') {
        
        next();
    } else {
        
        res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador.' });
    }
};