import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOrder } from '../redux/orderSlice';
import { clearLocalCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Checkout = () => {
    const [formData, setFormData] = useState({
        address: '',
        paymentMethod: 'card'
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.address) {
            toast.error("Please enter a delivery address.");
            return;
        }

        setIsPlacingOrder(true);
        console.log('Submitting order with data:', formData);

        try {
            const resultAction = await dispatch(createOrder(formData));

            if (createOrder.fulfilled.match(resultAction)) {
                console.log('Order placed successfully:', resultAction.payload);
                toast.success("Order placed successfully!");

                dispatch(clearLocalCart());

                navigate('/order-success', { state: { order: resultAction.payload } });
            } else {
                console.error('Failed to place order:', resultAction.payload);
                const errorMessage = resultAction.payload || 'Failed to place order. Please try again.';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Unexpected error placing order:', error);
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                            rows="3"
                            placeholder="Enter your full delivery address"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Pay with Credit/Debit Card
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={formData.paymentMethod === 'cash'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="mb-4 text-gray-600">
                            This is a placeholder checkout page. In a complete implementation,
                            you would have card details form, address verification, etc.
                        </p>
                        <button
                            type="submit"
                            disabled={isPlacingOrder}
                            className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 