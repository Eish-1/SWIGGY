import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Get cart from localStorage if available
const cartItems = localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) 
  : [];

const initialState = {
  items: cartItems,
  restaurantId: cartItems.length > 0 ? cartItems[0].restaurantId : null,
  restaurantName: cartItems.length > 0 ? cartItems[0].restaurantName : null,
  loading: false,
  error: null,
};

// Sync cart with server (if user is authenticated)
export const syncCart = createAsyncThunk(
  'cart/sync',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { items } = getState().cart;
      const response = await api.post('/cart', { items });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to sync cart'
      );
    }
  }
);

// Fetch cart from server
export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart');
      return response.data.items || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      
      // Check if items from a different restaurant
      if (state.items.length > 0 && newItem.restaurantId !== state.restaurantId) {
        state.items = [newItem];
        state.restaurantId = newItem.restaurantId;
        state.restaurantName = newItem.restaurantName;
      } else {
        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(
          item => item.id === newItem.id
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          state.items[existingItemIndex].quantity += newItem.quantity || 1;
        } else {
          // Add new item
          state.items.push(newItem);
          
          // Update restaurant info if cart was empty
          if (state.items.length === 1) {
            state.restaurantId = newItem.restaurantId;
            state.restaurantName = newItem.restaurantName;
          }
        }
      }
      
      // Save to localStorage
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity;
        
        // Remove item if quantity is 0
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
          
          // Reset restaurant info if cart becomes empty
          if (state.items.length === 0) {
            state.restaurantId = null;
            state.restaurantName = null;
          }
        }
        
        // Save to localStorage
        saveCartToLocalStorage(state.items);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Reset restaurant info if cart becomes empty
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      
      // Save to localStorage
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      
      // Clear from localStorage
      localStorage.removeItem('cart');
    },
  },
  extraReducers: (builder) => {
    builder
      // Sync cart
      .addCase(syncCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        if (action.payload.length > 0) {
          state.restaurantId = action.payload[0].restaurantId;
          state.restaurantName = action.payload[0].restaurantName;
        }
        saveCartToLocalStorage(action.payload);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 