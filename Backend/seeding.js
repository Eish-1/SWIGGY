import mongoose from 'mongoose';
import User  from './src/models/User.js'; 
import Cart from './src/models/Cart.js'; 
import Restaurant  from './src/models/Restaurant.js'; 
import Order  from './src/models/Order.js'; 
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Restaurant.deleteMany({});
        await Order.deleteMany({});
        await Cart.deleteMany({});

        // Create a sample user
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashedpassword', // In real app, use bcrypt
            phone: '1234567890',
            address: '123 Food Street'
        });

        // Create a sample restaurant
        const restaurant = await Restaurant.create({
            name: 'Tasty Bites',
            location: 'Foodie City',
            owner: user._id,
            menu: [
                {
                    name: 'Burger',
                    price: 10,
                    description: 'Delicious cheese burger'
                },
                {
                    name: 'Pizza',
                    price: 15,
                    description: 'Loaded cheese pizza'
                }
            ]
        });

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();