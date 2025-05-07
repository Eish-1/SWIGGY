import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUserOrders,
    selectUserOrders,
    selectOrdersStatus,
    selectOrdersError
} from '../redux/orderSlice';
import { toast } from 'react-toastify';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(selectUserOrders);
    const orderStatus = useSelector(selectOrdersStatus);
    const error = useSelector(selectOrdersError);

    useEffect(() => {
        console.log("[OrderHistory useEffect] Running.");
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("[OrderHistory useEffect] No token, navigating to login.");
            toast.info('Please log in to view order history.');
            navigate('/login');
            return;
        }

        console.log("[OrderHistory useEffect] Dispatching fetchUserOrders.");
        dispatch(fetchUserOrders());
    }, [dispatch, navigate]);

    // Log orders data whenever it changes
    useEffect(() => {
        console.log("[OrderHistory] Current orders data:", orders);
        if (orders && orders.length > 0) {
            console.log("[OrderHistory] First order details:", orders[0]);
        }
    }, [orders]);

    if (orderStatus === 'loading') {
        console.log("[OrderHistory] Rendering Loading State");
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019] mx-auto"></div>
                    <p className="text-xl mt-4 text-[#282C3F]">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (orderStatus === 'failed') {
        console.error("[OrderHistory] Rendering Error State:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p className="text-xl">Error: {error}</p>
                    <p>Please try again later.</p>
                </div>
            </div>
        );
    }

    if (orderStatus === 'succeeded' && orders.length === 0) {
        console.log("[OrderHistory] Rendering Empty State");
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
                <p className="text-gray-600 mb-8">
                    You haven't placed any orders yet. Start ordering your favorite food!
                </p>
                <Link
                    to="/restaurants"
                    className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
                >
                    Browse Restaurants
                </Link>
            </div>
        );
    }

    console.log("[OrderHistory] Rendering Orders List. Count:", orders.length);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-[#F97316]">Your Order History</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div>
                    {orders.map((order, index) => {
                        const orderIdShort = order._id ? order._id.substring(order._id.length - 8) : 'N/A';
                        const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';
                        const itemCount = order.items?.length || 0;
                        const total = order.totalPrice?.toFixed(2) || 'N/A';
                        const restaurantName = order.restaurant?.name || 'Restaurant Unavailable';

                        return (
                            <div key={order._id || index} className="border-b p-4 hover:bg-gray-50">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <p className="font-semibold">Order #{orderIdShort}</p>
                                        <p className="text-sm text-gray-500">From: {restaurantName}</p>
                                        <p className="text-gray-600">Date: {orderDate}</p>
                                        <p className="text-gray-600">
                                            Items: {itemCount} | Total: ₹{total}
                                        </p>
                                        {order.items && order.items.length > 0 && (
                                            <div className="mt-2 text-sm text-gray-500">
                                                Items: {order.items.map(item => item.name || '?').join(', ')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ') : 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory; 