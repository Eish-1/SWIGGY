import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
    faUser,
    faSignInAlt,
    faUserPlus,
    faSignOutAlt,
    faUtensils,
    faBug
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../utils/auth';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        userName: '',
        token: null
    });

    // Debug function to check localStorage
    const debugLocalStorage = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        console.log('DEBUG: Token in localStorage:', token);
        console.log('DEBUG: UserData in localStorage:', userData);

        try {
            if (userData) {
                const parsedUser = JSON.parse(userData);
                console.log('DEBUG: Parsed userData:', parsedUser);
            }
        } catch (error) {
            console.error('DEBUG: Error parsing userData:', error);
        }

        // Force update auth state
        const hasToken = !!token;
        let userName = 'User';

        if (hasToken && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                userName = parsedUser.name || parsedUser.email || 'User';
            } catch {
                // Empty catch block - just use default userName
            }
        }

        setAuthState({
            isLoggedIn: hasToken,
            userName,
            token
        });

        console.log('DEBUG: Updated auth state:', { isLoggedIn: hasToken, userName, token });
    };

    // Initial auth check and setup
    useEffect(() => {
        // Function to check login status and update state once
        const updateAuthState = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('userData');

            console.log('MOUNT: Checking login status:', { token, userData });

            const hasToken = !!token;
            let userName = 'User'; // Default name

            if (hasToken && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    userName = parsedUser.name || parsedUser.email || 'User';
                    console.log('MOUNT: Successfully parsed user data:', parsedUser);
                } catch (error) {
                    // Empty catch block - just use default userName
                    console.error('MOUNT: Error parsing user data:', error);
                }
            }

            console.log('MOUNT: Setting auth state to:', { isLoggedIn: hasToken, userName, token });

            // Always update state on mount to ensure it's correct
            setAuthState({
                isLoggedIn: hasToken,
                userName,
                token
            });
        };

        // Check immediately on mount
        updateAuthState();

        // Add event listener for storage changes (for cross-tab synchronization)
        const handleStorageChange = (e) => {
            if (e.key === 'token' || e.key === 'userData') {
                console.log('STORAGE: Storage event detected for key:', e.key);
                updateAuthState();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // Add a login event listener
    useEffect(() => {
        // Listen for custom login event
        const handleLoginEvent = () => {
            console.log('NAVBAR: Login event detected, updating auth state');
            // Force immediate auth state update
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('userData');

            const hasToken = !!token;
            let userName = 'User';

            if (hasToken && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    userName = parsedUser.name || parsedUser.email || 'User';
                    console.log('NAVBAR: Login event processed, user:', parsedUser);
                } catch {
                    console.error('NAVBAR: Login event error parsing user data');
                }
            }

            setAuthState({
                isLoggedIn: hasToken,
                userName,
                token
            });
        };

        window.addEventListener('login', handleLoginEvent);

        return () => {
            window.removeEventListener('login', handleLoginEvent);
        };
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        logout(); // Use the auth utility function
        // No need to navigate - logout function handles page reload
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-orange-500 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/Home/Swiggy_logo_bml6he.png"
                            alt="Swiggy Logo"
                            className="h-8 mr-2"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="font-bold text-white hover:text-orange-200 transition duration-300 text-lg">
                            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                            Restaurants
                        </Link>

                        {authState.isLoggedIn && (
                            <Link to="/cart" className="hover:text-orange-200 transition duration-300">
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Cart
                            </Link>
                        )}

                        {/* Debug button */}
                        <button
                            onClick={debugLocalStorage}
                            className="text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
                            title="Debug localStorage"
                        >
                            <FontAwesomeIcon icon={faBug} /> Debug
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative dropdown-container">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center hover:text-orange-200 transition duration-300 focus:outline-none"
                                data-testid="profile-button"
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                {authState.isLoggedIn ? authState.userName : 'Profile'}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
                                    {authState.isLoggedIn ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-800 hover:bg-orange-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/my-restaurants"
                                                className="block px-4 py-2 text-gray-800 hover:bg-orange-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                                                My Restaurants
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100"
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 text-gray-800 hover:bg-orange-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-2 text-gray-800 hover:bg-orange-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 