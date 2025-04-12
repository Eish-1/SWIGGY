import axios from 'axios';

// TODO: Use environment variable for base URL
const API_BASE_URL = 'http://localhost:8000/api';

const orderApi = axios.create({
    baseURL: `${API_BASE_URL}/orders`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token dynamically
orderApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Fetch orders for the logged-in user
export const fetchOrders = async () => {
    const response = await orderApi.get('/');
    // Assuming backend sends { success: true, orders: [...] }
    return response.data; 
};

// Potential: Add function to create order if needed here
// export const createNewOrder = async (orderData) => { ... }

// Function to create a new order
export const createNewOrder = async (checkoutData) => {
    // The backend currently ignores the body for order creation
    // but we might pass address/payment info in the future.
    // Sending an empty object or checkoutData for now.
    const response = await orderApi.post('/', checkoutData || {}); 
    return response.data; // Assuming backend sends { success: true, order: { ... } }
};

export default orderApi; 