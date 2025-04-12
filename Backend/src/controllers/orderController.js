import  Order  from '../models/Order.js';
import Restaurant  from '../models/Restaurant.js';
import Cart  from '../models/Cart.js';

// Create a new order
export const createOrder = async (req, res) => {
    console.log(`[createOrder] Attempting order creation for user: ${req.user?._id}`); // Log user ID
    try {
        // Get cart for the user - WITHOUT populating item details yet
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cart is empty' 
            });
        }

        // Get all unique item IDs from the cart as strings
        const itemIds = cart.items.map(cartItem => cartItem.item.toString()); // Convert to strings immediately

        // Find the restaurant(s) containing these menu items
        // This assumes all items ARE from the same restaurant, 
        // which should be enforced when adding to cart ideally.
        // We find the first restaurant containing at least one of the items.
        const restaurantContainingItems = await Restaurant.findOne({ "menu._id": { $in: itemIds } });

        if (!restaurantContainingItems) {
             return res.status(404).json({ 
                success: false, 
                message: 'Could not find restaurant for cart items.' 
            });
        }
        const restaurantId = restaurantContainingItems._id;

        // Create a map of menuItemId -> { name, price } for quick lookup
        const menuItemDetailsMap = new Map();
        console.log(`[createOrder] Building details map from ${restaurantContainingItems.menu?.length || 0} menu items in restaurant ${restaurantContainingItems._id}`); // Log menu length
        restaurantContainingItems.menu.forEach(menuItem => {
             const menuItemIdStr = menuItem._id?.toString(); // Get menu item ID as string
             console.log(`[createOrder] Mapping menu item ID: ${menuItemIdStr}`); 
             // Compare string ID against the array of string IDs from the cart
            if (itemIds.includes(menuItemIdStr)) { 
                 menuItemDetailsMap.set(menuItemIdStr, {
                    name: menuItem.name,
                    price: menuItem.price
                });
            }
        });
        console.log(`[createOrder] Built menuItemDetailsMap with ${menuItemDetailsMap.size} entries.`); // Log map size

        // Log cart items before mapping
        console.log("[createOrder] Cart items before mapping to order items:", JSON.stringify(cart.items, null, 2));

        // Build the order items array using details from the map
        const orderItems = cart.items.map(cartItem => {
            const cartItemIdStr = cartItem.item?.toString(); // Get cart item ID as string
            console.log(`[createOrder] Mapping cart item ID: ${cartItemIdStr}`); // Log the ID being looked up
            const details = menuItemDetailsMap.get(cartItemIdStr);
            if (!details) {
                console.error(`[createOrder] CRITICAL: Details not found in map for cart item ID: ${cartItemIdStr}`); // Log the specific missing ID
                throw new Error(`Details not found for item ID: ${cartItem.item}`);
            }
            return {
                item: cartItem.item, // Store the original ObjectId
                quantity: cartItem.quantity,
                price: details.price, // Use fetched price
                name: details.name,   // Use fetched name
                // image: details.image // Use fetched image if added
            };
        });

        // Calculate total price using fetched prices
        const totalPrice = orderItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );

        console.log(`[createOrder] Restaurant ID: ${restaurantId}`);
        console.log(`[createOrder] Calculated Total Price: ${totalPrice}`);
        console.log(`[createOrder] Order Items Count: ${orderItems.length}`);

        // Create new order
        const newOrder = new Order({
            user: req.user._id,
            restaurant: restaurantId, 
            items: orderItems,       
            totalPrice,
            status: 'pending'
        });
        
        console.log(`[createOrder] Order object before save:`, JSON.stringify(newOrder, null, 2));

        // Save order
        const savedOrder = await newOrder.save();
        console.log(`[createOrder] Order saved successfully! ID: ${savedOrder._id}`);

        // Clear the cart
        console.log(`[createOrder] Clearing cart for user: ${req.user?._id}`);
        await Cart.findOneAndDelete({ user: req.user._id });
        console.log(`[createOrder] Cart cleared.`);

        // Add order to user's order history (Check if User model has 'orders' array)
        // Assuming User model has an orders array field:
        // await User.findByIdAndUpdate(req.user._id, { $push: { orders: newOrder._id } }); 

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: savedOrder
        });
    } catch (error) {
         console.error("Error creating order:", error); // Log the actual error
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create order', 
            error: error.message 
        });
    }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
    console.log(`[getUserOrders] FUNCTION CALLED for user: ${req.user?._id}`); // Log function entry
    try {
        const userId = req.user?._id;
        if (!userId) {
            console.error('[getUserOrders] Error: req.user._id is missing!');
            return res.status(401).json({ success: false, message: 'Authentication error' });
        }
        
        console.log(`[getUserOrders] Finding orders for user ID: ${userId}`);
        // Temporarily remove populate to isolate the find query
        const orders = await Order.find({ user: userId })
            // .populate('restaurant', 'name location') // Temporarily removed
            .sort({ createdAt: -1 });

        // Log the raw orders found
        console.log(`[getUserOrders] Found ${orders.length} raw orders for user ${userId}`);
        // Optional: Log the found orders themselves (can be verbose)
        // console.log('[getUserOrders] Orders data:', JSON.stringify(orders, null, 2));

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