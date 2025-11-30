import express from 'express';
import { createOrder, getMyOrders, getOrderById, getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

// CORRECCIÓN: Esta ruta específica DEBE ir antes de /:id
router.get('/admin', protect, admin, getAllOrders); 

// Esta ruta captura cualquier cosa (como un ID), por eso va al final
router.get('/:id', protect, getOrderById);

export default router;