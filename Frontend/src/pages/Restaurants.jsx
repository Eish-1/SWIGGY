import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurantAPI } from '../api/axios';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching restaurants...');
                const response = await restaurantAPI.get('/');
                console.log('Restaurants response:', response.data);

                // Handle the nested restaurants structure
                if (response.data && response.data.success && response.data.restaurants) {
                    setRestaurants(response.data.restaurants);
                } else {
                    setRestaurants([]);
                }
            } catch (err) {
                console.error('Error fetching restaurants:', err);
                setError('Failed to fetch restaurants. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl">Loading restaurants...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-xl text-red-600 mb-4">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!restaurants.length) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl">No restaurants found.</div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                    <Link
                        key={restaurant._id}
                        to={`/restaurant/${restaurant._id}`}
                        className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-48 object-cover"
                            />
                            {restaurant.rating && (
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-bold text-yellow-500">
                                    {restaurant.rating} ⭐
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-1">{restaurant.name}</h2>
                            <p className="text-gray-600 text-sm">{restaurant.location}</p>
                            {restaurant.cuisines && restaurant.cuisines.length > 0 && (
                                <p className="text-sm text-gray-500 mt-2 truncate">
                                    {restaurant.cuisines.join(', ')}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Restaurants; 