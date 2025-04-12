import express from 'express';
import { 
    addToCart, 
    removeFromCart,
    getUserCart,
    clearCart,
    updateCartItemQuantity
} from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected Routes
router.post('/add', authMiddleware, addToCart);
router.delete('/remove/:itemId', authMiddleware, removeFromCart);
router.get('/', authMiddleware, getUserCart);
router.delete('/clear', authMiddleware, clearCart);
router.put('/item/:itemId', authMiddleware, updateCartItemQuantity);

export default router;