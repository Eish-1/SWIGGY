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
        console.log(`Fetching restaurant with ID: ${req.params.id}`);
        
        // Use lean() to get a plain JavaScript object instead of a Mongoose document
        const restaurant = await Restaurant.findById(req.params.id)
            .populate('owner', 'name email')
            .lean();

        if (!restaurant) {
            return res.status(404).json({ 
                success: false, 
                message: 'Restaurant not found' 
            });
        }

        // Log restaurant details and menu items for debugging
        console.log(`Found restaurant: ${restaurant.name}`);
        console.log(`Menu items: ${restaurant.menu ? restaurant.menu.length : 0} items`);
        
        if (restaurant.menu && restaurant.menu.length > 0) {
            console.log('Menu items:');
            restaurant.menu.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.name} - ₹${item.price}`);
            });
        }
        
        // Return the restaurant with menu items
        res.status(200).json({
            success: true,
            restaurant: {
                ...restaurant,
                menu: restaurant.menu || []
            }
        });
    } catch (error) {
        console.error('Error in getRestaurantById:', error);
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

// Add a new function to get menu items for a specific restaurant
export const getMenuItems = async (req, res) => {
    try {
        console.log(`Fetching menu items for restaurant ID: ${req.params.id}`);
        
        // Use lean() for better performance
        const restaurant = await Restaurant.findById(req.params.id).lean();

        if (!restaurant) {
            console.log(`Restaurant not found with ID: ${req.params.id}`);
            return res.status(404).json({ 
                success: false, 
                message: 'Restaurant not found' 
            });
        }

        const menuItems = restaurant.menu || [];
        console.log(`Found ${menuItems.length} menu items for restaurant: ${restaurant.name}`);
        
        // Log each menu item for debugging
        if (menuItems.length > 0) {
            menuItems.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.name} - ₹${item.price}`);
            });
        } else {
            console.log('No menu items found for this restaurant');
        }

        // Return all menu items for the restaurant
        res.status(200).json({
            success: true,
            restaurant: restaurant.name,
            data: menuItems,
            count: menuItems.length
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch menu items', 
            error: error.message 
        });
    }
};

// Get restaurants owned by current user
export const getMyRestaurants = async (req, res) => {
    try {
        console.log(`Fetching restaurants owned by user: ${req.user._id}`);
        
        // Find all restaurants where the owner field matches the current user's ID
        const restaurants = await Restaurant.find({ owner: req.user._id }).lean();
        
        console.log(`Found ${restaurants.length} restaurants owned by user ${req.user._id}`);
        
        // Return the restaurants
        res.status(200).json({
            success: true,
            count: restaurants.length,
            restaurants
        });
    } catch (error) {
        console.error('Error in getMyRestaurants:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch your restaurants', 
            error: error.message 
        });
    }
};