

import express from 'express';
import { getUserCart, addOrUpdateCartItem, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.get('/', protect, getUserCart);
router.post('/', protect, addOrUpdateCartItem); 
router.delete('/', protect, clearCart);

export default router;