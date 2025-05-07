import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('LOGIN: Submitting form with data:', formData);

        try {
            // Clear existing auth data to prevent conflicts
            localStorage.removeItem('token');
            localStorage.removeItem('userData');

            console.log('LOGIN: Sending request to server...');

            // Using the userAPI instance for authentication
            const response = await userAPI.post('/login', formData);
            const data = response.data;

            console.log('LOGIN: Received response from server:', data);

            // Store token and user data
            console.log('LOGIN: Storing token and user data in localStorage');
            console.log('LOGIN: Token:', data.token);
            console.log('LOGIN: User data:', data.user);

            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            // Force a custom event to notify other components about the login
            window.dispatchEvent(new Event('login'));

            console.log('LOGIN: Authentication data stored, redirecting...');

            // Redirect based on user role
            if (data.user.role === 'restaurant_owner') {
                navigate('/restaurant/manage');
            } else {
                navigate('/');
            }

            // Force a page reload to ensure all components recognize the login state
            window.location.reload();
        } catch (err) {
            console.error('LOGIN ERROR:', err);
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-orange-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 