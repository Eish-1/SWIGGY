import express from 'express';
import { 
    createRestaurant, 
    getAllRestaurants, 
    getRestaurantById,
    updateRestaurant,
    addMenuItem
} from '../controllers/restaurantController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Protected Routes
router.post('/', authMiddleware, createRestaurant);
router.put('/:id', authMiddleware, updateRestaurant);
router.post('/:id/menu', authMiddleware, addMenuItem);

export default router;