

import express from 'express';
import { createCategory, getCategories, deleteCategory } from '../controllers/categoryController.js';
// Importamos los middlewares de seguridad
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', protect, admin, createCategory);
router.delete('/:id', protect, admin, deleteCategory);


router.get('/', getCategories);

export default router;