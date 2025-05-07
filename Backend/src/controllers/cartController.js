import  Cart  from '../models/Cart.js';
import  Restaurant from '../models/Restaurant.js';

// Add item to cart
export const addToCart = async (req, res) => {
    console.log(`[addToCart] Received request for item: ${req.body?.itemId}, quantity: ${req.body?.quantity}`);
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user._id;

        // --- Step 1: Fetch the menu item details --- 
        console.log(`[addToCart] Finding menu item details with ID: ${itemId}`);
        const restaurantContainingItem = await Restaurant.findOne(
            { "menu._id": itemId },
            { "menu.$": 1 }
        );

        if (!restaurantContainingItem || !restaurantContainingItem.menu || restaurantContainingItem.menu.length === 0) {
            console.log(`[addToCart] Item details not found in any restaurant menu for ID: ${itemId}.`);
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        const actualMenuItem = restaurantContainingItem.menu[0];
        console.log(`[addToCart] Extracted actual menu item details:`, JSON.stringify(actualMenuItem, null, 2));
        
        // Check required fields from fetched details before proceeding
        if (!actualMenuItem.name || actualMenuItem.price === undefined || actualMenuItem.price === null) {
            console.error(`[addToCart] CRITICAL: Missing required fields (name/price) in fetched menu item details:`, actualMenuItem);
            return res.status(500).json({ success: false, message: 'Internal error processing item details.'});
        }

        // --- Step 2: Find or create user's cart --- 
        console.log(`[addToCart] Finding or creating cart for user: ${userId}`);
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            console.log(`[addToCart] No existing cart found, creating a new one.`);
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }

        // --- Step 3: Ensure existing cart items have names (Backfill if needed) --- 
        console.log(`[addToCart] Checking/Backfilling names for ${cart.items.length} existing cart items.`);
        const itemsToBackfill = cart.items.filter(item => !item.name);
        if (itemsToBackfill.length > 0) {
            console.log(`[addToCart] Found ${itemsToBackfill.length} items missing names. Fetching details...`);
            const objectIdsToBackfill = itemsToBackfill.map(item => item.item); // Get ObjectIds
            // Find restaurants containing ANY of the items needing backfill
            const restaurants = await Restaurant.find({ "menu._id": { $in: objectIdsToBackfill } }, { "menu.name": 1, "menu._id": 1 });
            
            // Convert IDs to strings for reliable lookup/comparison
            const stringIdsToBackfill = objectIdsToBackfill.map(id => id.toString());
            
            const backfillDetailsMap = new Map();
            restaurants.forEach(r => {
                r.menu.forEach(m => {
                     const menuItemIdStr = m._id.toString(); // Get menu item ID as string
                     // Compare strings
                     if (stringIdsToBackfill.includes(menuItemIdStr)) { 
                         backfillDetailsMap.set(menuItemIdStr, { name: m.name });
                     }
                });
            });
            console.log(`[addToCart] Built backfill map with ${backfillDetailsMap.size} entries.`);

            // Apply the names to the items in memory
            cart.items.forEach(item => {
                if (!item.name) {
                    const details = backfillDetailsMap.get(item.item.toString());
                    if (details) {
                        item.name = details.name;
                         console.log(`[addToCart] Backfilled name for item ID: ${item.item.toString()}`);
                    } else {
                         console.warn(`[addToCart] Could not find backfill details for existing item ID: ${item.item.toString()}. It might be removed from all menus.`);
                         // Decide how to handle - maybe remove it or leave it without name? For now, leave it.
                         // As name is required, saving will likely fail if we can't find it.
                         // Best solution is to clean up carts periodically or handle item deletion better.
                         // For now, we'll let the save attempt fail if name remains missing.
                    }
                }
            });
        }

        // --- Step 4: Add or update the requested item --- 
        const existingItemIndex = cart.items.findIndex(item => item.item.toString() === itemId);

        if (existingItemIndex > -1) {
            // Update quantity
            console.log(`[addToCart] Updating quantity for existing item index: ${existingItemIndex}`);
            cart.items[existingItemIndex].quantity += quantity;
             // Ensure the name is up-to-date (in case it changed)
             cart.items[existingItemIndex].name = actualMenuItem.name; 
        } else {
            // Add new item
            console.log(`[addToCart] Adding new item to cart.`);
            cart.items.push({
                item: itemId,
                quantity,
                price: actualMenuItem.price,
                name: actualMenuItem.name,
                image: actualMenuItem.image
            });
        }

        // --- Step 5: Recalculate total and save --- 
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
        console.log(`[addToCart] Recalculated total price: ${cart.totalPrice}`);

        console.log(`[addToCart] Attempting to save cart for user: ${userId}`);
        await cart.save();
        console.log(`[addToCart] Cart saved successfully.`);

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart
        });

    } catch (error) {
        console.error("[addToCart] CRITICAL ERROR in catch block:", error);
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
        const cart = await Cart.findOne({ user: req.user._id });

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

// Update item quantity in cart
export const updateCartItemQuantity = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body; // Expect new quantity in body

        if (quantity === undefined || quantity === null || quantity < 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid quantity provided' 
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cart not found' 
            });
        }

        const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Item not found in cart' 
            });
        }

        // If new quantity is 0, remove the item
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            // Update the quantity
            cart.items[itemIndex].quantity = quantity;
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart
        });

    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update cart item quantity', 
            error: error.message 
        });
    }
};