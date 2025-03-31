import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-lg mx-auto">
                <div className="mb-8">
                    <div className="inline-block p-4 bg-green-100 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8">
                    Your order has been received and is being processed. You'll receive
                    updates on the status of your delivery.
                </p>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <p className="mb-2">
                        <span className="font-medium">Order ID:</span> #123456789
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">Estimated Delivery:</span> 30-45 minutes
                    </p>
                    <p>
                        <span className="font-medium">Status:</span>{' '}
                        <span className="text-yellow-600">Preparing</span>
                    </p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Link
                        to="/orders"
                        className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300"
                    >
                        Track Your Order
                    </Link>
                    <Link
                        to="/"
                        className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess; 