// backend/routes/authRoutes.js

import express from 'express';
// --- CORRECCIÓN: Añadir getUsers ---
import { registerUser, authUser, updatePassword, blockUser, getUsers, forgotPassword, resetPassword } from '../controllers/authController.js';
// ------------------------------------
import { Op } from 'sequelize';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

// RUTA: Cambio de Contraseña (Protegida)
router.put('/password', protect, updatePassword);

// RUTA: Bloqueo/Desbloqueo de Usuario (Solo Admin)
router.put('/:id/block', protect, admin, blockUser);

// RUTA QUE CRASHEÓ: Ahora getUsers está definido en el import
router.get('/admin/users', protect, admin, getUsers);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);
export default router;