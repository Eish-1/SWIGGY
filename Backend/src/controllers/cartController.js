import  Cart  from '../models/Cart.js';
import  Restaurant from '../models/Restaurant.js';

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        // Find the menu item
        const menuItem = await Restaurant.findOne(
            { 'menu._id': itemId },
            { 'menu.$': 1 }
        );

        if (!menuItem) {
            return res.status(404).json({ 
                success: false, 
                message: 'Item not found' 
            });
        }

        // Find or create user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ 
                user: req.user._id, 
                items: [],
                totalPrice: 0
            });
        }

        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.item.toString() === itemId
        );

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                item: itemId,
                quantity,
                price: menuItem.menu[0].price
            });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.price * item.quantity), 
            0
        );

        // Save cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add item to cart', 
            error: error.message 
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        // Find user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cart not found' 
            });
        }

        // Remove item from cart
        cart.items = cart.items.filter(
            item => item.item.toString() !== itemId
        );

        // Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.price * item.quantity), 
            0
        );

        // Save cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to remove item from cart', 
            error: error.message 
        });
    }
};

// Get user's cart
export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.item', 'name price description');

        if (!cart) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cart not found' 
            });
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch cart', 
            error: error.message 
        });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to clear cart', 
            error: error.message 
        });
    }
};