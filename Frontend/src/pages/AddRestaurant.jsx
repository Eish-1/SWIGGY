import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { createRestaurant } from '../redux/slices/restaurantSlice';

const AddRestaurant = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.restaurants);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        cuisines: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Transform cuisines string to array if needed
            const restaurantData = {
                name: formData.name,
                location: formData.location,
                cuisines: formData.cuisines.split(',').map(cuisine => cuisine.trim()),
                // Only include image if it's not empty
                ...(formData.image && { image: formData.image })
            };

            const resultAction = await dispatch(createRestaurant(restaurantData));

            if (createRestaurant.fulfilled.match(resultAction)) {
                alert('Restaurant added successfully!');
                navigate('/my-restaurants');
            }
        } catch (err) {
            console.error('Failed to create restaurant:', err);
        }
    };

    return (
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <Link to="/my-restaurants" className="text-[#FC8019] hover:underline flex items-center mb-6">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to My Restaurants
            </Link>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#FC8019] text-2xl mr-3" />
                    <h1 className="text-2xl font-bold text-[#282C3F]">Add New Restaurant</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Restaurant Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                            placeholder="Enter restaurant name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                            placeholder="Enter restaurant location"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cuisines" className="block text-gray-700 font-medium mb-2">
                            Cuisines *
                        </label>
                        <input
                            type="text"
                            id="cuisines"
                            name="cuisines"
                            value={formData.cuisines}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                            placeholder="Enter cuisines (comma separated, e.g. Italian, Mexican, Chinese)"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                            placeholder="Enter image URL (optional)"
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                                <img
                                    src={formData.image}
                                    alt="Restaurant preview"
                                    className="h-24 w-40 object-cover rounded-md"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/Restaurants/default-restaurant.jpg';
                                    }}
                                />
                            </div>
                        )}
                        <p className="mt-2 text-sm text-gray-500">Enter a complete URL (starting with http:// or https://)</p>
                    </div>

                    <div className="flex justify-end">
                        <Link
                            to="/my-restaurants"
                            className="px-4 py-2 mr-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 bg-[#FC8019] text-white rounded-lg hover:bg-[#e07016] transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Adding...' : 'Add Restaurant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant; 