// backend/src/routes/categoryRoutes.js

import express from 'express';
// --- CORRECCIÓN: DEBEMOS IMPORTAR updateCategory ---
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js'; 
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, admin, createCategory);
router.delete('/:id', protect, admin, deleteCategory);
// Línea 9: Ahora 'updateCategory' ya está definido
router.put('/:id', protect, admin, updateCategory); 

export default router;