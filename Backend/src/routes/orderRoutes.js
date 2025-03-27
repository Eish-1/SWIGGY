import express from 'express';
import { 
    createOrder, 
    getUserOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected Routes
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;