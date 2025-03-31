import mongoose from 'mongoose';

const getRandomImageUrl = "lol";

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
