import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders as fetchOrdersApi, createNewOrder as createOrderApi } from '../api/orderApi';

// Async thunk for fetching user orders
export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (_, { rejectWithValue }) => {
        try {
            console.log("[orderSlice] Fetching user orders from API");
            const data = await fetchOrdersApi();
            console.log("[orderSlice] API response:", data);
            
            if (data.success) {
                console.log(`[orderSlice] Successfully fetched ${data.orders?.length || 0} orders`);
                return data.orders || []; // Return the orders array
            } else {
                console.error("[orderSlice] API returned success: false", data.message);
                return rejectWithValue(data.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error("[orderSlice] Error fetching orders:", error);
            return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred while fetching orders');
        }
    }
);

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (checkoutData, { rejectWithValue }) => { // checkoutData might include address, etc.
        try {
            // The backend createOrder currently ignores req.body, 
            // it reconstructs the order from the user's cart.
            // We might pass checkoutData if needed later (e.g., for address).
            const data = await createOrderApi(checkoutData); 
            if (data.success) {
                return data.order; // Return the newly created order object
            } else {
                return rejectWithValue(data.message || 'Failed to create order');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred while creating the order');
        }
    }
);

const initialState = {
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear previous errors
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // createOrder handlers
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading'; // Or a specific 'creating' status
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally add the new order to the state immediately, 
                // although fetching on history page load is often sufficient.
                // state.orders.unshift(action.payload); 
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetOrderStatus } = orderSlice.actions;

// Selectors
export const selectUserOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer; 