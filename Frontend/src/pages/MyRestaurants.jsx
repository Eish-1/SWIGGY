import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUtensils, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchMyRestaurants } from '../redux/slices/restaurantSlice';

const MyRestaurants = () => {
    const dispatch = useDispatch();
    const { myRestaurants, loading, error } = useSelector(state => state.restaurants);

    useEffect(() => {
        dispatch(fetchMyRestaurants());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019] mx-auto"></div>
                    <p className="text-xl mt-4 text-[#282C3F]">Loading your restaurants...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="text-center text-red-500">
                    <p className="text-xl">Error: {error}</p>
                    <p className="mb-4">Please try again later.</p>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#282C3F]">My Restaurants</h1>
                <Link
                    to="/add-restaurant"
                    className="bg-[#FC8019] text-white px-4 py-2 rounded-lg hover:bg-[#e07016] transition-colors duration-300 flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New Restaurant
                </Link>
            </div>

            {myRestaurants.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FontAwesomeIcon icon={faUtensils} className="text-5xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold text-[#282C3F] mb-2">No Restaurants Yet</h2>
                    <p className="text-gray-600 mb-6">You haven't added any restaurants to your account yet.</p>
                    <Link
                        to="/add-restaurant"
                        className="bg-[#FC8019] text-white px-6 py-3 rounded-lg hover:bg-[#e07016] transition-colors duration-300 inline-flex items-center"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Your First Restaurant
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRestaurants.map((restaurant) => (
                        <div key={restaurant._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-48">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/Restaurants/default-restaurant.jpg';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <Link
                                        to={`/edit-restaurant/${restaurant._id}`}
                                        className="bg-white text-[#FC8019] p-2 rounded-full mr-2"
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[#282C3F]">{restaurant.name}</h3>
                                <p className="text-gray-500 mt-1">{restaurant.location}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-gray-500">
                                        {restaurant.menu?.length || 0} Menu Items
                                    </div>
                                    <div className="flex">
                                        <Link
                                            to={`/restaurant/${restaurant._id}`}
                                            className="text-[#FC8019] hover:underline text-sm"
                                        >
                                            View
                                        </Link>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <Link
                                            to={`/edit-restaurant/${restaurant._id}`}
                                            className="text-[#FC8019] hover:underline text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRestaurants; 