import axios from 'axios';

// TODO: Use environment variable for base URL
const API_BASE_URL = 'http://localhost:8000/api'; 

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const cartApi = axios.create({
    baseURL: `${API_BASE_URL}/cart`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token dynamically
cartApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchCart = async () => {
    const response = await cartApi.get('/');
    return response.data; // Assuming backend sends { success: true, cart: { ... } }
};

export const addItem = async ({ itemId, quantity }) => {
    const response = await cartApi.post('/add', { itemId, quantity });
    return response.data; // Assuming backend sends { success: true, cart: { ... } }
};

export const removeItem = async (itemId) => {
    // Ensure itemId is passed correctly in the URL
    const response = await cartApi.delete(`/remove/${itemId}`); 
    return response.data; // Assuming backend sends { success: true, cart: { ... } }
};

export const clearCart = async () => {
    const response = await cartApi.delete('/clear');
    return response.data; // Assuming backend sends { success: true, message: '...' }
};

// Function to update item quantity
export const updateItemQuantity = async ({ itemId, quantity }) => {
    const response = await cartApi.put(`/item/${itemId}`, { quantity });
    return response.data; // Assuming backend sends { success: true, cart: { ... } }
};

// Potential future function if backend route is added:
// export const updateItemQuantity = async ({ itemId, quantity }) => {
//     const response = await cartApi.put(`/update/${itemId}`, { quantity });
//     return response.data;
// };

export default cartApi; // Exporting the configured instance might also be useful 