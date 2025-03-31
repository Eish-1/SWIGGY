import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRestaurant, clearRestaurantError } from '../redux/slices/restaurantSlice';

const AddRestaurant = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.restaurants);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        cuisines: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any previous errors when component mounts
        dispatch(clearRestaurantError());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data
        const restaurantData = {
            name: formData.name,
            location: formData.location,
            cuisines: formData.cuisines.split(',').map(cuisine => cuisine.trim()).filter(Boolean),
            image: formData.image || undefined
        };

        // Dispatch the action
        const resultAction = await dispatch(createRestaurant(restaurantData));

        // Navigate to my-restaurants page if successful
        if (createRestaurant.fulfilled.match(resultAction)) {
            navigate('/my-restaurants');
        }
    };

    return (
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#282C3F] mb-8">Add a New Restaurant</h1>

            {error && (
                <div className="bg-red-50 p-4 rounded-lg mb-6 text-red-600 border-l-4 border-red-600">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
                        Cuisines (comma separated)
                    </label>
                    <input
                        type="text"
                        id="cuisines"
                        name="cuisines"
                        value={formData.cuisines}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                        placeholder="Italian, Mexican, Indian, etc."
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
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/my-restaurants')}
                        className="px-6 py-2 mr-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-[#FC8019] text-white rounded-lg hover:bg-[#e07016] transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Adding...' : 'Add Restaurant'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant; 