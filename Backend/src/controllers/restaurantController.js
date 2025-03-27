import  Restaurant  from '../models/Restaurant.js';
import User  from '../models/User.js';

// Create a new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const { name, location, menu } = req.body;

        // Create new restaurant
        const newRestaurant = new Restaurant({
            name,
            location,
            owner: req.user._id,
            menu: menu || []
        });

        // Save restaurant
        await newRestaurant.save();

        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            restaurant: newRestaurant
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create restaurant', 
            error: error.message 
        });
    }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        const { search, location, rating } = req.query;
        
        // Build query
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (rating) {
            query.rating = { $gte: parseFloat(rating) };
        }

        const restaurants = await Restaurant.find(query)
            .populate('owner', 'name email');

        res.status(200).json({
            success: true,
            count: restaurants.length,
            restaurants
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch restaurants', 
            error: error.message 
        });
    }
};

// Get single restaurant details
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate('owner', 'name email');

        if (!restaurant) {
            return res.status(404).json({ 
                success: false, 
                message: 'Restaurant not found' 
            });
        }

        res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch restaurant', 
            error: error.message 
        });
    }
};

// Update restaurant details
export const updateRestaurant = async (req, res) => {
    try {
        const { name, location, menu } = req.body;

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ 
                success: false, 
                message: 'Restaurant not found' 
            });
        }

        // Check if the user is the owner
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to update this restaurant' 
            });
        }

        // Update fields
        if (name) restaurant.name = name;
        if (location) restaurant.location = location;
        if (menu) restaurant.menu = menu;

        await restaurant.save();

        res.status(200).json({
            success: true,
            message: 'Restaurant updated successfully',
            restaurant
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update restaurant', 
            error: error.message 
        });
    }
};

// Add menu item to restaurant
export const addMenuItem = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ 
                success: false, 
                message: 'Restaurant not found' 
            });
        }

        // Check if the user is the owner
        if (restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to add menu items' 
            });
        }

        // Add menu item
        const newMenuItem = {
            name,
            price,
            description,
            image: req.body.image || undefined
        };

        restaurant.menu.push(newMenuItem);
        await restaurant.save();

        res.status(201).json({
            success: true,
            message: 'Menu item added successfully',
            restaurant
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add menu item', 
            error: error.message 
        });
    }
};