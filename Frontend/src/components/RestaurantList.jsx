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
            <div className="flex flex-col items-center justify-center py-16">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse-slow">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary-500">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <p className="text-xl mt-6 text-text-primary font-medium">Finding delicious options for you...</p>
                <p className="text-text-secondary mt-2">Just a moment while we gather the best restaurants</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 max-w-2xl mx-auto text-center">
                <div className="bg-error-light bg-opacity-10 text-error p-4 rounded-lg inline-flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-text-primary mb-2">Error Loading Restaurants</h3>
                <p className="text-text-secondary mb-6">{error}</p>
                <p className="text-text-secondary text-sm mb-4">Please check if the backend server is running and try again.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-button"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (restaurants.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 max-w-2xl mx-auto text-center">
                <div className="p-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-text-primary mb-2">No Restaurants Found</h3>
                <p className="text-text-secondary">
                    We couldn't find any restaurants
                    {location ? ` in ${location}` : ''}
                    {searchTerm ? ` matching "${searchTerm}"` : ''}
                </p>
                {(location || searchTerm) && (
                    <Link
                        to="/"
                        className="mt-6 inline-block text-primary-500 hover:text-primary-600 font-medium"
                    >
                        View All Restaurants
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
                <Link
                    to={`/restaurant/${restaurant._id || restaurant.id}`}
                    key={restaurant._id || restaurant.id}
                    className="group bg-white rounded-xl shadow-card overflow-hidden transition-all duration-400 hover:shadow-hover hover:-translate-y-1 flex flex-col h-full"
                >
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={restaurant.image || restaurant.imageUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/Restaurants/default-restaurant.jpg';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>

                        {/* Overlay Quick Info */}
                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium flex items-center">
                            <span className="text-success font-bold mr-1">{restaurant.rating || '4.0'}</span> ★
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="text-white font-bold text-xl group-hover:text-primary-300 transition-colors duration-300">{restaurant.name}</div>
                            <div className="text-white text-sm opacity-90">{restaurant.cuisine}</div>
                        </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <div className="mb-4">
                            <div className="flex items-center mb-3 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-text-secondary">
                                    {restaurant.deliveryTime || '30-40'} mins delivery time
                                </div>
                            </div>

                            <div className="flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="text-text-secondary truncate">{restaurant.location}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-light-gray pt-3">
                            <div className="text-text-primary font-medium">₹{restaurant.priceForTwo || '500'} for two</div>
                            <div className="text-primary-500 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                                View Menu
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RestaurantList; 