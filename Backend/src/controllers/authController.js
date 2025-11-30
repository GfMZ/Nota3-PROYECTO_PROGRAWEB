import User from '../Models/Users.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Op } from 'sequelize';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  // El frontend envía 'name' (completo)
  const { name, email, password, country, role } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe.' });

    // LÓGICA: Separar nombre completo en Nombre y Apellido
    const nameParts = name ? name.split(' ') : ['Usuario', ''];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '.'; // Si no hay apellido, ponemos un punto o vacío

    // Guardamos en las columnas correctas
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
      // Reconstruimos 'name' para que el frontend lo muestre en el Header
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
      // CRÍTICO: Asegurar que el usuario no esté bloqueado antes de emitir un token
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
    const user = req.user; // Objeto de usuario adjunto por 'protect' middleware

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    try {
        // 1. Verificar contraseña antigua
        if (!(await user.matchPassword(oldPassword))) {
            return res.status(401).json({ message: 'La contraseña antigua es incorrecta.' });
        }

        // 2. Actualizar y guardar. El hook beforeSave en Users.js la hashea automáticamente.
        user.password = newPassword; 
        await user.save(); 

        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar contraseña.' });
    }
};

export const blockUser = async (req, res) => {
    const userId = req.params.id; 
    const { isBlocked } = req.body; // Recibimos el nuevo estado (true/false)

    try {
        const userToBlock = await User.findByPk(userId);

        if (!userToBlock) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        // Regla de Negocio: Evitar bloquear cuentas de administrador
        if (userToBlock.role === 'admin' && isBlocked) {
            return res.status(403).json({ message: 'No puedes bloquear a un administrador.' });
        }

        userToBlock.isBlocked = isBlocked; // Actualiza el campo
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
        // Excluimos la contraseña por seguridad
        const users = await User.findAll({ 
            attributes: { exclude: ['password'] } 
        });

        // Mapeamos para compatibilidad con el frontend (id a _id)
        const formattedUsers = users.map(user => ({
            ...user.toJSON(),
            _id: user.id,
            // Reconstruimos el nombre, añadimos el estado de bloqueo
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
        // 1. Encontrar usuario por token y verificar expiración
        const user = await User.findOne({ 
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() } // Token no debe haber expirado
            }
        });
        
        if (!user) {
            return res.status(400).json({ message: 'El token de restablecimiento es inválido o ha expirado.' });
        }

        // 2. Actualizar la contraseña (el hook beforeSave la hashea)
        user.password = newPassword;
        user.resetPasswordToken = null; // Limpiar campos temporales
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente. Puede iniciar sesión.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- FUNCIÓN AÑADIDA: SOLICITAR TOKEN (forgotPassword) ---
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // Seguridad: Respuesta genérica para no confirmar la existencia del email.
            return res.status(200).json({ message: 'Si la cuenta existe, se ha enviado un enlace de restablecimiento.' });
        }

        // 1. Generar token
        const token = crypto.randomBytes(20).toString('hex');
        
        // 2. Guardar el token y su expiración (1 hora)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        // 3. Simulación de Envío de Email/URL (La URL que el front debe visitar)
        const resetURL = `http://localhost:5173/reset-password/${token}`; // Asumiendo que el front corre en 5173
        
        // Aquí iría el código de nodemailer. Por ahora, solo confirmamos:
        console.log(`🔑 RESET URL GENERADA: ${resetURL}`);

        return res.status(200).json({ 
            message: 'Si el correo existe, el enlace de restablecimiento se ha enviado a su bandeja.',
            // Opcional: devolver la URL en dev para pruebas
            resetURL: process.env.NODE_ENV !== 'production' ? resetURL : undefined
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};