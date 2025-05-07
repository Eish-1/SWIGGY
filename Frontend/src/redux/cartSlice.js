import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCart as fetchCartApi, addItem as addItemApi, removeItem as removeItemApi, clearCart as clearCartApi, updateItemQuantity as updateItemQuantityApi } from '../api/cartApi';

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchCartApi();
        if (data.success) {
            // Ensure items and totalPrice exist, provide defaults if not
            return {
                items: data.cart?.items || [],
                totalPrice: data.cart?.totalPrice || 0
            };
        } else {
            return rejectWithValue(data.message || 'Failed to fetch cart');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for adding an item
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
        const data = await addItemApi({ itemId, quantity });
        if (data.success) {
             return {
                items: data.cart?.items || [],
                totalPrice: data.cart?.totalPrice || 0
            }; // Return the updated cart
        } else {
            return rejectWithValue(data.message || 'Failed to add item');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for removing an item
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (itemId, { rejectWithValue }) => {
    try {
        const data = await removeItemApi(itemId);
        if (data.success) {
            return {
                items: data.cart?.items || [],
                totalPrice: data.cart?.totalPrice || 0
            }; // Return the updated cart
        } else {
            return rejectWithValue(data.message || 'Failed to remove item');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for clearing the cart
export const clearUserCart = createAsyncThunk('cart/clearUserCart', async (_, { rejectWithValue }) => {
    try {
        const data = await clearCartApi();
        if (data.success) {
            return; // No cart data needed, just confirmation
        } else {
            return rejectWithValue(data.message || 'Failed to clear cart');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for updating item quantity
export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ itemId, quantity }, { rejectWithValue }) => {
        try {
            const data = await updateItemQuantityApi({ itemId, quantity });
            if (data.success) {
                return {
                    items: data.cart?.items || [],
                    totalPrice: data.cart?.totalPrice || 0
                }; // Return the updated cart
            } else {
                return rejectWithValue(data.message || 'Failed to update quantity');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred updating quantity');
        }
    }
);

const initialState = {
    items: [],
    totalPrice: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Reducer to clear the cart state locally
        clearLocalCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.status = 'idle'; // Reset status
            state.error = null;
        },
        resetCartStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Error message from rejectWithValue
                // Keep existing items in case of fetch failure?
                 // state.items = []; // Or clear them?
                 // state.totalPrice = 0;
            })
            // addItemToCart
            .addCase(addItemToCart.pending, (/* state */) => {
                // Optional: Set a specific adding status?
                // state.status = 'loading'; 
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Or keep idle if no global loading needed?
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
                 state.error = null;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             // removeItemFromCart
            .addCase(removeItemFromCart.pending, (/* state */) => {
                // Optional: Set a specific removing status?
                 // state.status = 'loading';
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
                 state.error = null;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
             // clearUserCart
            .addCase(clearUserCart.pending, (state) => {
                 state.status = 'loading';
            })
            .addCase(clearUserCart.fulfilled, (state) => {
                state.status = 'succeeded';
                state.items = [];
                state.totalPrice = 0;
                 state.error = null;
            })
            .addCase(clearUserCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            // updateCartItemQuantity handlers
            .addCase(updateCartItemQuantity.pending, (/* state */) => {
                // Optional: Set status to loading?
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
            
            // // Future: updateItemQuantity handlers
            // .addCase(updateItemQuantity.fulfilled, (state, action) => {
            //     state.items = action.payload.items;
            //     state.totalPrice = action.payload.totalPrice;
            // });
    },
});

export const { resetCartStatus, clearLocalCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartItemCount = (state) => state.cart.items.reduce((count, item) => count + item.quantity, 0);


export default cartSlice.reducer; 