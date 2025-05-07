import mongoose from 'mongoose';

const getRandomImageUrl = "https://imgs.search.brave.com/aQeI1R0456g6cvFYZKqGewllutrn2wKM6uYiTJxGeHc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzgzLzQwLzA1/LzM2MF9GXzI4MzQw/MDUyMV9FQldLTjNO/TXRaZXhZajdxSHhR/Q2YwYmE5OTlXWk04/ZC5qcGc";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    image: {
        type: String,
        default: getRandomImageUrl
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cuisines: [{
        type: String,
        required: false
    }],
    menu: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: String,
        image: {
            type: String,
            default: getRandomImageUrl
        }
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
