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
    faHistory,
    faStore,
    faEdit,
    faPlusCircle,
    faClipboardList,
    // faBug // Commented out debug icon
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../utils/auth';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../redux/cartSlice';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        userName: '',
        token: null
    });
    const cartItemCount = useSelector(selectCartItemCount);

    // Debug function to check localStorage
    /*
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
    */

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
        <nav className="bg-[#F97316] text-white shadow-nav sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo - Positioned on the left */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/Home/Swiggy_logo_bml6he.png"
                            alt="Swiggy Logo"
                            className="h-10 mr-2"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/restaurants" className="font-medium text-white hover:text-gray-200 transition duration-300 flex items-center">
                            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                            <span>Restaurants</span>
                        </Link>

                        {authState.isLoggedIn && (
                            <Link
                                to="/orders"
                                className="font-medium text-white hover:text-gray-200 transition duration-300 flex items-center"
                            >
                                <FontAwesomeIcon icon={faHistory} className="mr-2" />
                                <span>Orders</span>
                            </Link>
                        )}

                        {/* Cart Link with Item Count */}
                        <Link
                            to="/cart"
                            className="font-medium text-white hover:text-gray-200 transition duration-300 flex items-center relative"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            <span>Cart</span>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-[#F97316] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Account Section */}
                        <div className="dropdown-container relative">
                            <button
                                onClick={toggleDropdown}
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                                className="flex items-center font-medium text-white hover:text-gray-200 transition duration-300 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                <span>{authState.isLoggedIn ? authState.userName : 'Account'}</span>
                                <svg
                                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {/* Dropdown Menu with Enhanced Styling */}
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-dropdown overflow-hidden animate-fade-in"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    {authState.isLoggedIn ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faUser} className="mr-2 text-[#F97316]" />
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faHistory} className="mr-2 text-[#F97316]" />
                                                Order History
                                            </Link>

                                            {/* Restaurant Management Section - Divider */}
                                            <div className="border-t border-gray-200 my-1"></div>

                                            {/* Restaurant Management Options */}
                                            <Link
                                                to="/my-restaurants"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faStore} className="mr-2 text-[#F97316]" />
                                                My Restaurants
                                            </Link>
                                            <Link
                                                to="/add-restaurant"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-[#F97316]" />
                                                Add Restaurant
                                            </Link>

                                            {/* Logout Section - Divider */}
                                            <div className="border-t border-gray-200 my-1"></div>

                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-[#F97316]" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-[#F97316]" />
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-300"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={faUserPlus} className="mr-2 text-[#F97316]" />
                                                Sign Up
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