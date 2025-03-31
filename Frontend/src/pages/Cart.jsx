import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:8000/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }

                const data = await response.json();
                setCartItems(data.data?.items || []);
                setTotalPrice(data.data?.totalPrice || 0);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCart();
    }, [navigate]);

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/cart/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            // Update local state
            const updatedItems = cartItems.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            );

            setCartItems(updatedItems);
            recalculateTotal(updatedItems);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/cart/item/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove item');
            }

            // Update local state
            const updatedItems = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedItems);
            recalculateTotal(updatedItems);
        } catch (err) {
            setError(err.message);
        }
    };

    const recalculateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(newTotal);
    };

    if (loading) {
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
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p className="text-xl">Error: {error}</p>
                    <p>Please try again later.</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#282C3F]">Your Cart</h1>

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
                            {cartItems.map((item) => (
                                <li key={item._id} className="p-4 flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-[#282C3F]">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500">₹{item.price.toFixed(2)} each</p>
                                    </div>
                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <button
                                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="ml-4 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
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
};

export default Cart; 