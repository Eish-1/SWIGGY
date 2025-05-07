/**
 * Authentication utilities for the Swiggy Clone application
 */

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Get user data
export const getUserData = () => {
    try {
        const userData = localStorage.getItem('userData');
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.reload();
};

// Check auth state and log to console (helpful for debugging)
export const checkAuthState = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    console.log('AUTH: Current auth state');
    console.log('AUTH: Token exists:', !!token);
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            console.log('AUTH: User data:', user);
        } catch (error) {
            console.error('AUTH: Error parsing user data:', error);
        }
    } else {
        console.log('AUTH: No user data found');
    }
    
    return !!token;
};

// Initialize auth - call this once on app start
export const initAuth = () => {
    checkAuthState();
    
    // If authenticated, trigger login event
    if (isAuthenticated()) {
        window.dispatchEvent(new Event('login'));
    }
}; 