import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  restaurants: [],
  myRestaurants: [],
  currentRestaurant: null,
  loading: false,
  error: null,
};

// Get all restaurants
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { search, location } = params;
      let url = '/restaurants';
      
      // Add query parameters if provided
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (location) queryParams.append('location', location);
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
      
      const response = await api.get(url);
      return response.data.restaurants || response.data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch restaurants'
      );
    }
  }
);

// Get restaurants owned by current user
export const fetchMyRestaurants = createAsyncThunk(
  'restaurants/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/restaurants/my/restaurants');
      return response.data.restaurants || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch your restaurants'
      );
    }
  }
);

// Get a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data.restaurant || response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch restaurant details'
      );
    }
  }
);

// Create a new restaurant
export const createRestaurant = createAsyncThunk(
  'restaurants/create',
  async (restaurantData, { rejectWithValue }) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      return response.data.restaurant;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create restaurant'
      );
    }
  }
);

// Update an existing restaurant
export const updateRestaurant = createAsyncThunk(
  'restaurants/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/restaurants/${id}`, data);
      return response.data.restaurant;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update restaurant'
      );
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    clearRestaurantError: (state) => {
      state.error = null;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.loading = false;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch my restaurants
      .addCase(fetchMyRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRestaurants.fulfilled, (state, action) => {
        state.myRestaurants = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single restaurant
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.currentRestaurant = action.payload;
        state.loading = false;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create restaurant
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.myRestaurants.push(action.payload);
        state.loading = false;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.myRestaurants = state.myRestaurants.map(restaurant =>
          restaurant._id === action.payload._id ? action.payload : restaurant
        );
        state.currentRestaurant = action.payload;
        state.loading = false;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRestaurantError, clearCurrentRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer; 