import mongoose from 'mongoose';
 
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant.menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        name: {
            type: String,
            required: true 
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;