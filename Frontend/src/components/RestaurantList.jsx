import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RestaurantList = ({ location, searchTerm }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build URL with query parameters if provided
                let url = 'http://localhost:8000/api/restaurants';
                const params = new URLSearchParams();

                if (location) {
                    params.append('location', location);
                }

                if (searchTerm) {
                    params.append('search', searchTerm);
                }

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }

                console.log('Fetching restaurants from:', url);

                // Set timeout to prevent hanging request
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

                const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`Failed to fetch restaurants. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Restaurant data received:', data);

                // Handle different response formats
                if (data.success && Array.isArray(data.restaurants)) {
                    setRestaurants(data.restaurants);
                } else if (data.success && Array.isArray(data.data)) {
                    setRestaurants(data.data);
                } else if (Array.isArray(data)) {
                    setRestaurants(data);
                } else {
                    console.error('Unexpected data format:', data);
                    throw new Error('Invalid data format received from server');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                setLoading(false);
                setRestaurants([]); // Always reset to empty array on error
            }
        };

        fetchRestaurants();
    }, [location, searchTerm]); // Re-fetch when location or search term changes

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019] mx-auto"></div>
                <p className="text-xl mt-4 text-[#282C3F]">Loading delicious options for you...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                <p className="text-xl">Error: {error}</p>
                <p className="mb-4">Please try again later or check if the backend server is running.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-[#FC8019] text-white px-4 py-2 rounded-lg hover:bg-[#e07016] transition-colors duration-300"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (restaurants.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                    No restaurants found{location ? ` in ${location}` : ''}.
                    {searchTerm ? ` matching "${searchTerm}"` : ''}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
                <Link
                    to={`/restaurant/${restaurant._id || restaurant.id}`}
                    key={restaurant._id || restaurant.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                    <div className="relative h-48">
                        <img
                            src={restaurant.image || restaurant.imageUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/Restaurants/default-restaurant.jpg';
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="text-white font-bold text-xl">{restaurant.name}</div>
                            <div className="text-white text-sm">{restaurant.cuisine}</div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="bg-green-700 text-white text-sm font-bold px-2 py-1 rounded mr-2">
                                {restaurant.rating || '4.0'} ★
                            </div>
                            <div className="text-gray-600 text-sm">
                                {restaurant.deliveryTime || '30-40'} mins
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm">{restaurant.location}</div>
                        <div className="mt-2 text-gray-700">₹{restaurant.priceForTwo || '500'} for two</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RestaurantList; 