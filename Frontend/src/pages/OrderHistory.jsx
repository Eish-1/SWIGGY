import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Not authenticated');
                }

                const response = await fetch('http://localhost:8000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-xl">Loading your orders...</p>
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

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
                <p className="text-gray-600 mb-8">
                    You haven't placed any orders yet. Start ordering your favorite food!
                </p>
                <Link
                    to="/"
                    className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
                >
                    Browse Restaurants
                </Link>
            </div>
        );
    }

    // This is a placeholder. In a complete implementation, you'd display the full UI with real order data
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Order History</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <p className="text-gray-600">This is a placeholder for the order history page.</p>
                </div>

                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="border-b p-4 hover:bg-gray-50">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <div>
                                    <p className="font-semibold">Order #{order._id.substring(0, 8)}</p>
                                    <p className="text-gray-600">
                                        Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        Items: {order.items.length} | Total: ${order.totalPrice.toFixed(2)}
                                    </p>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${order.status === 'delivered'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'cancelled'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory; 