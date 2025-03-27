import  Order  from '../models/Order.js';
import Restaurant  from '../models/Restaurant.js';
import Cart  from '../models/Cart.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        // Get cart for the user
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.item');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cart is empty' 
            });
        }

        // Ensure all items are from the same restaurant
        const restaurantId = cart.items[0].item.restaurant;
        const allFromSameRestaurant = cart.items.every(
            item => item.item.restaurant.toString() === restaurantId.toString()
        );

        if (!allFromSameRestaurant) {
            return res.status(400).json({ 
                success: false, 
                message: 'Items must be from the same restaurant' 
            });
        }

        // Calculate total price
        const totalPrice = cart.items.reduce(
            (total, item) => total + (item.item.price * item.quantity), 
            0
        );

        // Create new order
        const newOrder = new Order({
            user: req.user._id,
            restaurant: restaurantId,
            items: cart.items.map(item => ({
                item: item.item._id,
                quantity: item.quantity,
                price: item.item.price
            })),
            totalPrice,
            status: 'pending'
        });

        // Save order
        await newOrder.save();

        // Clear the cart
        await Cart.findOneAndDelete({ user: req.user._id });

        // Add order to user's order history
        req.user.orders.push(newOrder._id);
        await req.user.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create order', 
            error: error.message 
        });
    }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('restaurant', 'name location')
            .populate('items.item', 'name price');

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch orders', 
            error: error.message 
        });
    }
};

// Update order status (for restaurant owners/admins)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id)
            .populate('restaurant');

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order not found' 
            });
        }

        // Check if user is restaurant owner
        if (order.restaurant.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to update this order' 
            });
        }

        // Validate status
        const validStatuses = ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid order status' 
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update order status', 
            error: error.message 
        });
    }
};