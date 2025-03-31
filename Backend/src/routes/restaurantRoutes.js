import express from 'express';
import { 
    createRestaurant, 
    getAllRestaurants, 
    getRestaurantById,
    updateRestaurant,
    addMenuItem,
    getMenuItems,
    getMyRestaurants
} from '../controllers/restaurantController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllRestaurants);

// Protected Routes
router.get('/my/restaurants', authMiddleware, getMyRestaurants);

// Public Routes with params (must come after specific routes)
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getMenuItems);

// Protected Routes with params
router.post('/', authMiddleware, createRestaurant);
router.put('/:id', authMiddleware, updateRestaurant);
router.post('/:id/menu', authMiddleware, addMenuItem);

export default router;