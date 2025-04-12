import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUtensils,
    faPlus,
    faPencilAlt,
    faTrashAlt,
    faExclamationCircle,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import api from '../api/axios';

const ManageMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });

    // Fetch restaurant and menu data
    useEffect(() => {
        const fetchRestaurantAndMenu = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch restaurant details
                const restaurantResponse = await api.get(`/restaurants/${id}`);
                console.log('Restaurant response:', restaurantResponse.data);

                // Fetch menu items
                const menuResponse = await api.get(`/restaurants/${id}/menu`);
                console.log('Menu response:', menuResponse.data);

                setRestaurant(restaurantResponse.data.restaurant || restaurantResponse.data.data);
                setMenuItems(menuResponse.data.data || []);
            } catch (err) {
                console.error('Error fetching restaurant data:', err);
                setError(err.response?.data?.message || 'Failed to load restaurant data');

                // If unauthorized, redirect to login
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantAndMenu();
    }, [id, navigate]);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Reset and show add form
    const handleShowAddForm = () => {
        setFormData({
            name: '',
            price: '',
            description: '',
            image: ''
        });
        setShowAddForm(true);
        setShowEditForm(false);
    };

    // Set up edit form with item data
    const handleShowEditForm = (item) => {
        console.log("Editing menu item:", item);
        setCurrentItem(item);
        setFormData({
            name: item.name || '',
            price: item.price || '',
            description: item.description || '',
            image: item.image || ''
        });
        setShowEditForm(true);
        setShowAddForm(false);
    };

    // Add menu item
    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate price
            const price = parseFloat(formData.price);
            if (isNaN(price) || price <= 0) {
                alert('Please enter a valid price');
                setIsSubmitting(false);
                return;
            }

            const itemData = {
                name: formData.name,
                price,
                ...(formData.description && { description: formData.description }),
                ...(formData.image && { image: formData.image })
            };

            console.log('Sending menu item data:', itemData);
            const response = await api.post(`/restaurants/${id}/menu`, itemData);
            console.log('Add menu item response:', response.data);

            // Add the new item to the menu items
            if (response.data && response.data.success) {
                // Refresh menu items
                const menuResponse = await api.get(`/restaurants/${id}/menu`);
                setMenuItems(menuResponse.data.data || []);

                // Reset form and hide it
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    image: ''
                });
                setShowAddForm(false);
                alert('Menu item added successfully');
            }
        } catch (err) {
            console.error('Error adding menu item:', err);
            alert(err.response?.data?.message || 'Failed to add menu item');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update menu item
    const handleUpdateMenuItem = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!currentItem) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Validate price
            const price = parseFloat(formData.price);
            if (isNaN(price) || price <= 0) {
                alert('Please enter a valid price');
                setIsSubmitting(false);
                return;
            }

            const itemData = {
                name: formData.name,
                price,
                ...(formData.description && { description: formData.description }),
                ...(formData.image && { image: formData.image })
            };

            console.log('Updating menu item:', currentItem._id);
            console.log('With data:', itemData);

            const response = await api.put(`/restaurants/${id}/menu/${currentItem._id}`, itemData);
            console.log('Update menu item response:', response.data);

            // Update the menu items
            if (response.data && response.data.success) {
                // Refresh menu items
                const menuResponse = await api.get(`/restaurants/${id}/menu`);
                setMenuItems(menuResponse.data.data || []);

                // Reset form and hide it
                setCurrentItem(null);
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    image: ''
                });
                setShowEditForm(false);
                alert('Menu item updated successfully');
            }
        } catch (err) {
            console.error('Error updating menu item:', err);
            alert(err.response?.data?.message || 'Failed to update menu item. Error: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete menu item
    const handleDeleteMenuItem = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this menu item?')) {
            return;
        }

        try {
            console.log('Deleting menu item:', itemId);
            const response = await api.delete(`/restaurants/${id}/menu/${itemId}`);
            console.log('Delete menu item response:', response.data);

            // Remove the deleted item from menu items
            if (response.data && response.data.success) {
                setMenuItems(menuItems.filter(item => item._id !== itemId));
                alert('Menu item deleted successfully');
            }
        } catch (err) {
            console.error('Error deleting menu item:', err);
            alert(err.response?.data?.message || 'Failed to delete menu item');
        }
    };

    if (loading) {
        return (
            <div className="container max-w-6xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019] mx-auto"></div>
                    <p className="text-xl mt-4 text-[#282C3F]">Loading restaurant menu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container max-w-6xl mx-auto px-4 py-16">
                <div className="text-center text-red-500">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-5xl mb-4" />
                    <p className="text-xl mb-4">{error}</p>
                    <Link
                        to="/my-restaurants"
                        className="mt-4 bg-[#FC8019] text-white px-4 py-2 rounded-lg hover:bg-[#e07016] transition-colors duration-300"
                    >
                        Back to My Restaurants
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    to="/my-restaurants"
                    className="text-[#FC8019] hover:underline flex items-center"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to My Restaurants
                </Link>
                <h1 className="text-3xl font-bold text-[#282C3F] mt-4">{restaurant?.name} - Menu Management</h1>
            </div>

            {/* Menu Controls */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{menuItems.length} menu items</p>
                <button
                    onClick={handleShowAddForm}
                    className="bg-[#FC8019] text-white px-4 py-2 rounded-lg hover:bg-[#e07016] transition-colors duration-300 flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Menu Item
                </button>
            </div>

            {/* Add Menu Item Form */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[#282C3F]">Add Menu Item</h2>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleAddMenuItem}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Item Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                    placeholder="Enter item name"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                    placeholder="Enter price"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                rows="3"
                                placeholder="Enter item description (optional)"
                            ></textarea>
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
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                placeholder="Enter image URL (optional)"
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                                    <img
                                        src={formData.image}
                                        alt="Food item preview"
                                        className="h-24 w-24 object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/Food/default-food.jpg';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 mr-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 bg-[#FC8019] text-white rounded-lg hover:bg-[#e07016] transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add Item'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Menu Item Form */}
            {showEditForm && currentItem && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[#282C3F]">Edit Menu Item</h2>
                        <button
                            onClick={() => setShowEditForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleUpdateMenuItem}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="edit-name" className="block text-gray-700 font-medium mb-2">
                                    Item Name *
                                </label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                    placeholder="Enter item name"
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-price" className="block text-gray-700 font-medium mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    id="edit-price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                    placeholder="Enter price"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="edit-description" className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                rows="3"
                                placeholder="Enter item description (optional)"
                            ></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="edit-image" className="block text-gray-700 font-medium mb-2">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="edit-image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019]"
                                placeholder="Enter image URL (optional)"
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                                    <img
                                        src={formData.image}
                                        alt="Food item preview"
                                        className="h-24 w-24 object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/Food/default-food.jpg';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowEditForm(false)}
                                className="px-4 py-2 mr-4 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 bg-[#FC8019] text-white rounded-lg hover:bg-[#e07016] transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Update Item'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Menu Items List */}
            {menuItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FontAwesomeIcon icon={faUtensils} className="text-5xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold text-[#282C3F] mb-2">No Menu Items</h2>
                    <p className="text-gray-600 mb-6">This restaurant doesn't have any menu items yet.</p>
                    <button
                        onClick={handleShowAddForm}
                        className="bg-[#FC8019] text-white px-6 py-3 rounded-lg hover:bg-[#e07016] transition-colors duration-300 inline-flex items-center"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Your First Menu Item
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Item
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {menuItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={item.image || '/Food/default-food.jpg'}
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/Food/default-food.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                            {item.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">₹{item.price.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleShowEditForm(item)}
                                            className="text-indigo-600 hover:text-indigo-900 mx-2"
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMenuItem(item._id)}
                                            className="text-red-600 hover:text-red-900 mx-2"
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMenu; 