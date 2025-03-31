import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [formData, setFormData] = useState({
        address: '',
        paymentMethod: 'card'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real implementation, this would send the checkout data to your backend
        console.log('Checkout data:', formData);

        // Navigate to order success page
        navigate('/order-success');
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
                            className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 