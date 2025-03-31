import axios from 'axios';

// Base API configuration
const createAPI = (baseURL) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add request interceptor for authentication
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor for error handling
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// In development, use relative paths to leverage Vite's proxy
const isProduction = import.meta.env.PROD;
const baseURL = isProduction ? 'http://localhost:8000' : '';

// API instance for restaurant endpoints
const restaurantAPI = createAPI(`${baseURL}/api/restaurants`);

// API instance for user endpoints
const userAPI = createAPI(`${baseURL}/api/users`);

// API instance for general endpoints
const api = createAPI(`${baseURL}/api`);

export { restaurantAPI, userAPI };
export default api; 