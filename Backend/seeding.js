import mongoose from 'mongoose';
import User from './src/models/User.js'; 
import Cart from './src/models/Cart.js'; 
import Restaurant from './src/models/Restaurant.js'; 
import Order from './src/models/Order.js'; 
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

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

        // Create 5 sample users with hashed passwords
        const salt = await bcrypt.genSalt(10);
        
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: await bcrypt.hash('password123', salt),
                phone: '1234567890',
                address: '123 Food Street, Downtown',
                role: 'customer'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: await bcrypt.hash('password123', salt),
                phone: '2345678901',
                address: '456 Main Avenue, Uptown',
                role: 'customer'
            },
            {
                name: 'Alex Johnson',
                email: 'alex@example.com',
                password: await bcrypt.hash('password123', salt),
                phone: '3456789012',
                address: '789 Park Road, Midtown',
                role: 'restaurant_owner'
            },
            {
                name: 'Priya Patel',
                email: 'priya@example.com',
                password: await bcrypt.hash('password123', salt),
                phone: '4567890123',
                address: '101 Oak Lane, Westside',
                role: 'restaurant_owner'
            },
            {
                name: 'Michael Chen',
                email: 'michael@example.com',
                password: await bcrypt.hash('password123', salt),
                phone: '5678901234',
                address: '202 Pine Street, Eastside',
                role: 'customer'
            }
        ]);

        console.log('Users created successfully');
        
        // Define 10 cuisine types
        const cuisineTypes = [
            'Indian', 
            'Italian', 
            'Chinese', 
            'Mexican', 
            'Japanese', 
            'Thai', 
            'American', 
            'Mediterranean', 
            'Lebanese', 
            'French'
        ];
        
        // Create 5 restaurants with random cuisines and menu items
        const restaurants = [];
        
        // Restaurant 1: Spice Garden
        restaurants.push(
            await Restaurant.create({
                name: 'Spice Garden',
                image: '/Restaurants/place1.jpg',
                location: 'Downtown, Food City',
                owner: users[2]._id, // Alex Johnson
                cuisines: [cuisineTypes[0], cuisineTypes[5], cuisineTypes[8]], // Indian, Thai, Lebanese
                menu: [
                    {
                        name: 'Butter Chicken',
                        price: 14.99,
                        description: 'Creamy tomato curry with grilled chicken',
                        image: '/Food/grilled_non_veg.jpg'
                    },
                    {
                        name: 'Dal Makhani',
                        price: 10.99,
                        description: 'Black lentils cooked with butter and cream',
                        image: '/Food/Daal_Makhani.jpg'
                    },
                    {
                        name: 'Naan Bread',
                        price: 3.99,
                        description: 'Freshly baked flatbread',
                        image: '/Food/naan.jpg'
                    },
                    {
                        name: 'Royal Thali',
                        price: 24.99,
                        description: 'Complete meal with variety of dishes',
                        image: '/Food/Royal_thali.jpg'
                    }
                ],
                rating: 4.5
            })
        );
        
        // Restaurant 2: Pasta Paradise
        restaurants.push(
            await Restaurant.create({
                name: 'Pasta Paradise',
                image: '/Restaurants/place2.jpg',
                location: 'Uptown, Food City',
                owner: users[3]._id, // Priya Patel
                cuisines: [cuisineTypes[1], cuisineTypes[7]], // Italian, Mediterranean
                menu: [
                    {
                        name: 'Spaghetti Carbonara',
                        price: 12.99,
                        description: 'Classic pasta with egg, cheese and pancetta',
                        image: '/Food/pasta.jpg'
                    },
                    {
                        name: 'Fettuccine Alfredo',
                        price: 13.99,
                        description: 'Creamy pasta with parmesan cheese sauce',
                        image: '/Food/cheese_sauce.jpg'
                    },
                    {
                        name: 'Margherita Pizza',
                        price: 15.99,
                        description: 'Fresh tomato, mozzarella and basil pizza',
                        image: '/Food/corn_curry.jpg' // Using as substitute
                    },
                    {
                        name: 'Tiramisu',
                        price: 7.99,
                        description: 'Coffee-flavored Italian dessert',
                        image: '/Food/pastry.jpg'
                    }
                ],
                rating: 4.3
            })
        );
        
        // Restaurant 3: Dragon Wok
        restaurants.push(
            await Restaurant.create({
                name: 'Dragon Wok',
                image: '/Restaurants/place3.jpg',
                location: 'Eastside, Food City',
                owner: users[2]._id, // Alex Johnson
                cuisines: [cuisineTypes[2], cuisineTypes[4], cuisineTypes[5]], // Chinese, Japanese, Thai
                menu: [
                    {
                        name: 'Kung Pao Chicken',
                        price: 13.99,
                        description: 'Spicy stir-fried chicken with peanuts',
                        image: '/Food/grilled_non_veg.jpg'
                    },
                    {
                        name: 'Vegetable Chow Mein',
                        price: 11.99,
                        description: 'Stir-fried noodles with mixed vegetables',
                        image: '/Food/noodles.jpg'
                    },
                    {
                        name: 'Shrimp Pad Thai',
                        price: 16.99,
                        description: 'Thai rice noodles with shrimp and peanuts',
                        image: '/Food/shrimp.jpg'
                    },
                    {
                        name: 'Vegetable Fried Rice',
                        price: 10.99,
                        description: 'Wok-fried rice with seasonal vegetables',
                        image: '/Food/soyachapp_gobhi_rice.jpg'
                    }
                ],
                rating: 4.7
            })
        );
        
        // Restaurant 4: Taco Fiesta
        restaurants.push(
            await Restaurant.create({
                name: 'Taco Fiesta',
                image: '/Restaurants/place4.jpg',
                location: 'Westside, Food City',
                owner: users[3]._id, // Priya Patel
                cuisines: [cuisineTypes[3], cuisineTypes[6]], // Mexican, American
                menu: [
                    {
                        name: 'Beef Tacos (3)',
                        price: 9.99,
                        description: 'Corn tortillas with seasoned beef and toppings',
                        image: '/Food/potato_tomato.jpg' // Using as substitute
                    },
                    {
                        name: 'Chicken Quesadilla',
                        price: 11.99,
                        description: 'Grilled tortilla filled with chicken and cheese',
                        image: '/Food/grilled_non_veg.jpg'
                    },
                    {
                        name: 'Loaded Nachos',
                        price: 13.99,
                        description: 'Tortilla chips topped with cheese, beans, and more',
                        image: '/Food/cheese_sauce.jpg'
                    },
                    {
                        name: 'Churros',
                        price: 6.99,
                        description: 'Fried dough pastry with cinnamon sugar',
                        image: '/Food/French_fries.jpg' // Using as substitute
                    }
                ],
                rating: 4.2
            })
        );
        
        // Restaurant 5: Le Bistro
        restaurants.push(
            await Restaurant.create({
                name: 'Le Bistro',
                image: '/Restaurants/place5.jpg',
                location: 'Midtown, Food City',
                owner: users[2]._id, // Alex Johnson
                cuisines: [cuisineTypes[9], cuisineTypes[7]], // French, Mediterranean
                menu: [
                    {
                        name: 'Coq au Vin',
                        price: 22.99,
                        description: 'Chicken braised with wine, mushrooms, and garlic',
                        image: '/Food/grilled_non_veg.jpg'
                    },
                    {
                        name: 'Ratatouille',
                        price: 16.99,
                        description: 'Provençal vegetable stew with eggplant and zucchini',
                        image: '/Food/corn_curry.jpg'
                    },
                    {
                        name: 'French Onion Soup',
                        price: 9.99,
                        description: 'Rich broth with caramelized onions and melted cheese',
                        image: '/Food/Daal_Makhani.jpg' // Using as substitute
                    },
                    {
                        name: 'Crème Brûlée',
                        price: 8.99,
                        description: 'Custard dessert with caramelized sugar crust',
                        image: '/Food/pastry.jpg'
                    }
                ],
                rating: 4.8
            })
        );
        
        console.log('Restaurants created successfully');
        
        // Create a shopping cart for each customer
        const carts = [];
        
        // Cart for John Doe
        carts.push(
            await Cart.create({
                user: users[0]._id,
                items: [
                    {
                        item: restaurants[0].menu[0]._id,
                        quantity: 2,
                        price: restaurants[0].menu[0].price
                    },
                    {
                        item: restaurants[0].menu[2]._id,
                        quantity: 3,
                        price: restaurants[0].menu[2].price
                    }
                ],
                totalPrice: (restaurants[0].menu[0].price * 2) + (restaurants[0].menu[2].price * 3)
            })
        );
        
        // Cart for Jane Smith
        carts.push(
            await Cart.create({
                user: users[1]._id,
                items: [
                    {
                        item: restaurants[2].menu[1]._id,
                        quantity: 1,
                        price: restaurants[2].menu[1].price
                    }
                ],
                totalPrice: restaurants[2].menu[1].price
            })
        );
        
        // Cart for Michael Chen
        carts.push(
            await Cart.create({
                user: users[4]._id,
                items: [
                    {
                        item: restaurants[3].menu[2]._id,
                        quantity: 2,
                        price: restaurants[3].menu[2].price
                    },
                    {
                        item: restaurants[3].menu[3]._id,
                        quantity: 4,
                        price: restaurants[3].menu[3].price
                    }
                ],
                totalPrice: (restaurants[3].menu[2].price * 2) + (restaurants[3].menu[3].price * 4)
            })
        );
        
        console.log('Carts created successfully');
        
        // Create 3 orders
        const orders = [];
        
        // Order 1: Completed order for John Doe
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        
        orders.push(
            await Order.create({
                user: users[0]._id,
                restaurant: restaurants[1]._id,
                items: [
                    {
                        item: restaurants[1].menu[0]._id,
                        quantity: 1,
                        price: restaurants[1].menu[0].price
                    },
                    {
                        item: restaurants[1].menu[3]._id,
                        quantity: 2,
                        price: restaurants[1].menu[3].price
                    }
                ],
                totalPrice: restaurants[1].menu[0].price + (restaurants[1].menu[3].price * 2),
                status: 'delivered',
                createdAt: twoWeeksAgo
            })
        );
        
        // Order 2: Ongoing order for Jane Smith
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        orders.push(
            await Order.create({
                user: users[1]._id,
                restaurant: restaurants[4]._id,
                items: [
                    {
                        item: restaurants[4].menu[0]._id,
                        quantity: 2,
                        price: restaurants[4].menu[0].price
                    },
                    {
                        item: restaurants[4].menu[2]._id,
                        quantity: 1,
                        price: restaurants[4].menu[2].price
                    }
                ],
                totalPrice: (restaurants[4].menu[0].price * 2) + restaurants[4].menu[2].price,
                status: 'out_for_delivery',
                createdAt: yesterday
            })
        );
        
        // Order 3: Recent order for Michael Chen
        const today = new Date();
        
        orders.push(
            await Order.create({
                user: users[4]._id,
                restaurant: restaurants[2]._id,
                items: [
                    {
                        item: restaurants[2].menu[2]._id,
                        quantity: 1,
                        price: restaurants[2].menu[2].price
                    },
                    {
                        item: restaurants[2].menu[1]._id,
                        quantity: 1,
                        price: restaurants[2].menu[1].price
                    }
                ],
                totalPrice: restaurants[2].menu[2].price + restaurants[2].menu[1].price,
                status: 'preparing',
                createdAt: today
            })
        );
        
        console.log('Orders created successfully');
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();