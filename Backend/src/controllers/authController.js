import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Op } from 'sequelize';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {

  const { name, email, password, country, role } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe.' });


    const nameParts = name ? name.split(' ') : ['Usuario', ''];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '.'; 
    
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password, 
      country, 
      role: role || 'user',
      username: email.split('@')[0] 
    });

    res.status(201).json({
      _id: user.id,
      id: user.id,
      
      name: `${user.firstName} ${user.lastName}`, 
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) {
      
      if (user.isBlocked) {
         return res.status(401).json({ message: 'Su cuenta ha sido bloqueada por la administración.' });
      }

      res.json({
        _id: user.id,
        id: user.id,
        // Reconstruimos 'name'
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin',
        token: generateToken(user.id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = req.user; 

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    try {
        
        if (!(await user.matchPassword(oldPassword))) {
            return res.status(401).json({ message: 'La contraseña antigua es incorrecta.' });
        }

        
        user.password = newPassword; 
        await user.save(); 

        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar contraseña.' });
    }
};

export const blockUser = async (req, res) => {
    const userId = req.params.id; 
    const { isBlocked } = req.body; 

    try {
        const userToBlock = await User.findByPk(userId);

        if (!userToBlock) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        
        if (userToBlock.role === 'admin' && isBlocked) {
            return res.status(403).json({ message: 'No puedes bloquear a un administrador.' });
        }

        userToBlock.isBlocked = isBlocked; 
        await userToBlock.save();

        res.json({ 
            message: `Usuario ${userToBlock.firstName} ha sido ${isBlocked ? 'BLOQUEADO' : 'DESBLOQUEADO'}.`,
            isBlocked: userToBlock.isBlocked
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar estado.' });
    }
};

export const getUsers = async (req, res) => {
    try {
        
        const users = await User.findAll({ 
            attributes: { exclude: ['password'] } 
        });

        
        const formattedUsers = users.map(user => ({
            ...user.toJSON(),
            _id: user.id,
            
            name: `${user.firstName} ${user.lastName}`,
            isBlocked: user.isBlocked
        }));

        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al listar usuarios.' });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    try {
        
        const user = await User.findOne({ 
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() } 
            }
        });
        
        if (!user) {
            return res.status(400).json({ message: 'El token de restablecimiento es inválido o ha expirado.' });
        }

        
        user.password = newPassword;
        user.resetPasswordToken = null; 
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente. Puede iniciar sesión.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
         
            return res.status(200).json({ message: 'Si la cuenta existe, se ha enviado un enlace de restablecimiento.' });
        }

        
        const token = crypto.randomBytes(20).toString('hex');
        
        
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        
        const resetURL = `http://localhost:5173/reset-password/${token}`; 
        
        
        console.log(`🔑 RESET URL GENERADA: ${resetURL}`);

        return res.status(200).json({ 
            message: 'Si el correo existe, el enlace de restablecimiento se ha enviado a su bandeja.',
            
            resetURL: process.env.NODE_ENV !== 'production' ? resetURL : undefined
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};