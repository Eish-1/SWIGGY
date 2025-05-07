import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchCart,
    removeItemFromCart,
    updateCartItemQuantity,
    clearUserCart,
    selectCartItems,
    selectCartTotalPrice,
    selectCartStatus,
    selectCartError
} from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
    console.log('[Cart Component] Mounting or Re-rendering');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(state => {
        console.log('[Cart Selector] Selecting items:', state.cart?.items);
        return selectCartItems(state);
    });
    const totalPrice = useSelector(state => {
        console.log('[Cart Selector] Selecting totalPrice:', state.cart?.totalPrice);
        return selectCartTotalPrice(state);
    });
    const cartStatus = useSelector(state => {
        console.log('[Cart Selector] Selecting status:', state.cart?.status);
        return selectCartStatus(state);
    });
    const error = useSelector(state => {
        console.log('[Cart Selector] Selecting error:', state.cart?.error);
        return selectCartError(state);
    });

    console.log('[Cart Component] Selected State:', { cartItems, totalPrice, cartStatus, error });

    useEffect(() => {
        console.log('[Cart useEffect] Running effect. Status:', cartStatus);
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('[Cart useEffect] No token found, navigating to login.');
            toast.info('Please log in to view your cart.');
            navigate('/login');
            return;
        }
        if (cartStatus === 'idle') {
            console.log('[Cart useEffect] Status is idle, dispatching fetchCart.');
            dispatch(fetchCart());
        } else {
            console.log('[Cart useEffect] Status is not idle, skipping fetchCart.');
        }
    }, [cartStatus, dispatch]);

    const handleUpdateQuantity = async (item, change) => {
        const menuItemId = item?.item;
        if (!menuItemId) {
            console.error("Invalid item structure for quantity update (missing item ID):", item);
            toast.error("Cannot update item quantity: Invalid item data.");
            return;
        }

        const currentQuantity = item.quantity || 0;
        const newQuantity = currentQuantity + change;

        dispatch(updateCartItemQuantity({ itemId: menuItemId, quantity: newQuantity }))
            .unwrap()
            .catch((err) => {
                console.error("Failed to update quantity:", err);
                const errorMessage = typeof err === 'string' ? err : 'Failed to update quantity.';
                toast.error(errorMessage);
            });
    };

    const handleRemoveItem = async (itemId) => {
        if (!itemId) {
            console.error("Invalid item ID for removal");
            toast.error("Cannot remove item: Invalid ID.");
            return;
        }
        dispatch(removeItemFromCart(itemId))
            .unwrap()
            .then(() => {
                toast.success('Item removed from cart.');
            })
            .catch((err) => {
                console.error("Failed to remove item:", err);
                const errorMessage = typeof err === 'string' ? err : 'Failed to remove item.';
                toast.error(errorMessage);
            });
    };

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear your entire cart?")) {
            dispatch(clearUserCart())
                .unwrap()
                .then(() => {
                    toast.success('Cart cleared successfully.');
                })
                .catch((err) => {
                    console.error("Failed to clear cart:", err);
                    const errorMessage = typeof err === 'string' ? err : 'Failed to clear cart.';
                    toast.error(errorMessage);
                });
        }
    };

    if (cartStatus === 'loading') {
        console.log('[Cart Component] Rendering Loading State');
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019] mx-auto"></div>
                    <p className="text-xl mt-4 text-[#282C3F]">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (error) {
        console.log('[Cart Component] Rendering Error State:', error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p className="text-xl">Error: {error}</p>
                    <p>Please try again later.</p>
                </div>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        console.log('[Cart Component] Rendering Empty Cart State');
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6 text-[#282C3F]">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">
                    You have no items in your cart. Start adding some!
                </p>
                <Link
                    to="/"
                    className="inline-block bg-[#FC8019] text-white px-6 py-3 rounded-md hover:bg-[#e07016] transition-colors duration-300"
                >
                    Browse Restaurants
                </Link>
            </div>
        );
    }

    console.log('[Cart Component] Rendering Cart Items');
    try {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#282C3F]">Your Cart</h1>
                    {cartItems.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-[#282C3F]">Cart Items</h2>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item) => {
                                    const key = item._id || `fallback-${Math.random()}`;
                                    const itemName = item.name || 'Item Name Unavailable';
                                    const itemPrice = item?.price?.toFixed(2) || 'N/A';
                                    const menuItemId = item.item;

                                    return (
                                        <li key={key} className="p-4 flex flex-col sm:flex-row sm:items-center">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-medium text-[#282C3F]">
                                                    {itemName}
                                                </h3>
                                                <p className="text-gray-500">₹{itemPrice} each</p>
                                            </div>
                                            <div className="flex items-center mt-4 sm:mt-0">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item, -1)}
                                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
                                                    disabled={!menuItemId}
                                                >
                                                    -
                                                </button>
                                                <span className="bg-gray-100 px-4 py-1">{item.quantity || 0}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item, 1)}
                                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
                                                    disabled={!menuItemId}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveItem(menuItemId)}
                                                    className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50"
                                                    disabled={!menuItemId}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#282C3F]">Order Summary</h2>
                            <div className="border-t border-b py-4 mb-4">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Delivery Fee</span>
                                    <span>₹50.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST</span>
                                    <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>₹{(totalPrice + 50 + totalPrice * 0.05).toFixed(2)}</span>
                            </div>
                            <Link
                                to="/checkout"
                                className="block text-center mt-6 bg-[#FC8019] text-white py-3 px-4 rounded-md hover:bg-[#e07016] transition-colors duration-300"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (renderError) {
        console.error('[Cart Component] CRITICAL: Error during main content render:', renderError);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p className="text-xl">Error rendering cart content.</p>
                    <p>Please try refreshing the page.</p>
                </div>
            </div>
        );
    }
};

export default Cart; 