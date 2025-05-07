import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSave, faTimes, faPhone, faMapMarkerAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { userAPI } from '../api/axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('You must be logged in to view this page');
                }

                const response = await userAPI.get('/profile');
                console.log('Profile response:', response.data);

                if (response.data && response.data.success && response.data.user) {
                    setUser(response.data.user);
                    setFormData({
                        name: response.data.user.name || '',
                        phone: response.data.user.phone || '',
                        address: response.data.user.address || ''
                    });
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch profile');

                // If unauthorized, redirect to login
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        if (editMode) {
            // Reset form data when canceling edit
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
        setEditMode(!editMode);
        setUpdateSuccess(false);
        setUpdateError(null);
    };

    // Submit profile update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateSuccess(false);
        setUpdateError(null);

        try {
            const response = await userAPI.put('/profile', formData);

            if (response.data && response.data.success) {
                setUser(response.data.user);
                setUpdateSuccess(true);
                setEditMode(false);

                // Update userData in localStorage
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const updatedUserData = { ...userData, ...formData };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));

                // Notify other components about the update
                window.dispatchEvent(new Event('login'));
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setUpdateError(err.response?.data?.message || err.message || 'Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                    </div>
                    <p className="text-center mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center text-red-600 mb-4">
                        <p>{error}</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center text-red-600 mb-4">
                        <p>User profile not found</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <button
                        onClick={toggleEditMode}
                        className={`px-4 py-2 rounded flex items-center ${editMode ? 'bg-gray-500 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
                    >
                        <FontAwesomeIcon icon={editMode ? faTimes : faEdit} className="mr-2" />
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {updateSuccess && (
                    <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
                        Profile updated successfully!
                    </div>
                )}

                {updateError && (
                    <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
                        {updateError}
                    </div>
                )}

                {editMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                                <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <div className="w-1/3 font-medium text-gray-600">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                                Full Name:
                            </div>
                            <div className="w-2/3">{user.name}</div>
                        </div>

                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <div className="w-1/3 font-medium text-gray-600">
                                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-gray-500" />
                                Role:
                            </div>
                            <div className="w-2/3 capitalize">{user.role || 'Customer'}</div>
                        </div>

                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <div className="w-1/3 font-medium text-gray-600">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                                Email:
                            </div>
                            <div className="w-2/3">{user.email}</div>
                        </div>

                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <div className="w-1/3 font-medium text-gray-600">
                                <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                                Phone:
                            </div>
                            <div className="w-2/3">{user.phone || 'Not provided'}</div>
                        </div>

                        <div className="flex items-start border-b border-gray-200 pb-4">
                            <div className="w-1/3 font-medium text-gray-600 pt-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                                Address:
                            </div>
                            <div className="w-2/3">{user.address || 'Not provided'}</div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-1/3 font-medium text-gray-600">
                                Member Since:
                            </div>
                            <div className="w-2/3">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 