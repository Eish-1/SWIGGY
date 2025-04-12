import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantAPI } from '../api/axios';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleAddToCart = (menuItem) => {
        if (!menuItem || !menuItem._id) {
            console.error("Invalid menu item provided to handleAddToCart");
            toast.error("Could not add item: Invalid item data.");
            return;
        }
        console.log(`Adding item ${menuItem.name} (ID: ${menuItem._id}) to cart`);
        dispatch(addItemToCart({ itemId: menuItem._id, quantity: 1 }))
            .unwrap()
            .then(() => {
                toast.success(`${menuItem.name} added to cart!`);
            })
            .catch((err) => {
                console.error("Failed to add item to cart:", err);
                const errorMessage = typeof err === 'string' ? err : 'Failed to add item. Please try again.';
                toast.error(errorMessage);
            });
    };

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching restaurant details for ID:', id);
                const [restaurantResponse, menuResponse] = await Promise.all([
                    restaurantAPI.get(`/${id}`),
                    restaurantAPI.get(`/${id}/menu`)
                ]);
                console.log('Restaurant response:', restaurantResponse.data);
                console.log('Menu response:', menuResponse.data);

                // Handle the nested restaurant and menu items structure
                if (restaurantResponse.data && restaurantResponse.data.success) {
                    setRestaurant(restaurantResponse.data.restaurant || null);
                } else {
                    setRestaurant(null);
                }

                if (menuResponse.data && menuResponse.data.success) {
                    setMenuItems(menuResponse.data.data || []);
                } else {
                    setMenuItems([]);
                }
            } catch (err) {
                console.error('Error fetching restaurant details:', err);
                setError('Failed to fetch restaurant details. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl">Loading restaurant details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-xl text-red-600 mb-4">{error}</div>
                <div className="space-x-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                    <Link
                        to="/"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back to Restaurants
                    </Link>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-xl text-red-600 mb-4">Restaurant not found</div>
                <Link
                    to="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Restaurants
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
                >
                    ← Back to Restaurants
                </Link>
                <div className="flex items-start gap-6">
                    <div className="w-48 h-48 flex-shrink-0">
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                        <p className="text-gray-600">{restaurant.location}</p>
                        {restaurant.cuisines && restaurant.cuisines.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                                Cuisines: {restaurant.cuisines.join(', ')}
                            </p>
                        )}
                        {restaurant.rating && (
                            <p className="text-sm text-gray-500 mt-1">
                                Rating: {restaurant.rating} ⭐
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Menu Items</h2>
            {menuItems.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded">
                    <p className="text-gray-600">No menu items available.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {menuItems.map((item) => (
                        <div key={item._id} className="border p-4 rounded hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                    <p className="font-bold text-lg mt-2">₹{item.price}</p>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails; 