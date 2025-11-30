
import express from 'express';

import { registerUser, authUser, updatePassword, blockUser, getUsers, forgotPassword, resetPassword } from '../controllers/authController.js';

import { Op } from 'sequelize';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);


router.put('/password', protect, updatePassword);


router.put('/:id/block', protect, admin, blockUser);


router.get('/admin/users', protect, admin, getUsers);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);
export default router;