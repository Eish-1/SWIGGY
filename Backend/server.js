import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import database connection
import connectDB from './src/config/db.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware Setup
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Enable CORS for all routes
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
// HTTP request logger
app.use(morgan('dev'));
app.use(cookieParser());

connectDB();

// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        message: 'Server is running smoothly!',
        timestamp: new Date().toISOString()
    });
});

import userRoutes from './src/routes/userRoutes.js';
import restaurantRoutes from './src/routes/restaurantRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Server configuration
const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || 'development';

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${MODE} mode on port ${PORT}`);
});