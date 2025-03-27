import mongoose from 'mongoose';

const getRandomImageUrl = "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?ga=GA1.1.697079088.1742493370&semt=ais_hybrid";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['customer', 'restaurant_owner', 'admin'],
        default: 'customer'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    profileImage: {
        type: String,
        default: getRandomImageUrl
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;