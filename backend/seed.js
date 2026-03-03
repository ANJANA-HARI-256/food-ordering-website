// // const mongoose = require("mongoose");
// // const Food = require("./models/Food"); // Adjust path if needed

// // // Replace with your actual MongoDB URI
// // const mongoURI = "mongodb://localhost:27017/food-app"; 

// // const seedFoods = [
// //   {
// //     name: "Gourmet Burger",
// //     description: "Juicy beef patty with fresh lettuce and cheese",
// //     price: 120,
// //     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
// //     category: "Main Course"
// //   },
// //   {
// //     name: "Italian Pizza",
// //     description: "Wood-fired crust with fresh mozzarella and basil",
// //     price: 250,
// //     image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
// //     category: "Main Course"
// //   }
// // ];

// // mongoose.connect(mongoURI)
// //   .then(async () => {
// //     console.log("Connected to MongoDB...");
// //     await Food.deleteMany(); // Clears old items with broken images
// //     await Food.insertMany(seedFoods);
// //     console.log("Database Seeded with High-Quality Images!");
// //     process.exit();
// //   })
// //   .catch(err => console.log(err));
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './models/User.js';
// import Food from './models/Food.js';
// import Restaurant from './models/Restaurant.js';
// import connectDB from './config/db.js';

// dotenv.config();
// connectDB();

// const seedData = async () => {
//   try {
//     // Clear existing data
//     await User.deleteMany();
//     await Food.deleteMany();
//     await Restaurant.deleteMany();

//     // Create admin user
//     const admin = await User.create({
//       name: 'Admin User',
//       email: 'admin@example.com',
//       password: 'admin123',
//       phone: '1234567890',
//       role: 'admin',
//     });

//     // Create restaurants
//     const restaurants = await Restaurant.create([
//       {
//         name: 'Pizza Paradise',
//         description: 'Best pizza in town',
//         address: {
//           street: '123 Main St',
//           city: 'New York',
//           state: 'NY',
//           zipCode: '10001',
//         },
//         phone: '212-555-0123',
//         email: 'info@pizzaparadise.com',
//         cuisine: ['Italian', 'Pizza'],
//         openingTime: '10:00',
//         closingTime: '23:00',
//       },
//       {
//         name: 'Burger House',
//         description: 'Gourmet burgers',
//         address: {
//           street: '456 Oak Ave',
//           city: 'Los Angeles',
//           state: 'CA',
//           zipCode: '90001',
//         },
//         phone: '310-555-0456',
//         email: 'info@burgerhouse.com',
//         cuisine: ['American', 'Fast Food'],
//         openingTime: '11:00',
//         closingTime: '22:00',
//       },
//     ]);

//     // Create food items
//     await Food.create([
//       {
//         name: 'Margherita Pizza',
//         description: 'Fresh tomatoes, mozzarella, basil',
//         price: 12.99,
//         category: 'Main Course',
//         restaurant: 'Pizza Paradise',
//         restaurantId: restaurants[0]._id,
//         rating: 4.5,
//       },
//       {
//         name: 'Pepperoni Pizza',
//         description: 'Classic pepperoni with extra cheese',
//         price: 14.99,
//         category: 'Main Course',
//         restaurant: 'Pizza Paradise',
//         restaurantId: restaurants[0]._id,
//         rating: 4.8,
//       },
//       {
//         name: 'Classic Burger',
//         description: 'Beef patty with lettuce, tomato, and special sauce',
//         price: 9.99,
//         category: 'Main Course',
//         restaurant: 'Burger House',
//         restaurantId: restaurants[1]._id,
//         rating: 4.3,
//       },
//       {
//         name: 'Cheese Fries',
//         description: 'Crispy fries topped with melted cheese',
//         price: 4.99,
//         category: 'Appetizer',
//         restaurant: 'Burger House',
//         restaurantId: restaurants[1]._id,
//         rating: 4.2,
//       },
//     ]);

//     console.log('Data seeded successfully!');
//     process.exit();
//   } catch (error) {
//     console.error('Error seeding data:', error);
//     process.exit(1);
//   }
// };

// seedData();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Food from './models/Food.js';
import Restaurant from './models/Restaurant.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Food.deleteMany();
    await Restaurant.deleteMany();

    console.log('Existing data cleared...');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '1234567890',
      address: {
        street: '123 Admin St',
        city: 'Admin City',
        state: 'AS',
        zipCode: '12345'
      },
      role: 'admin',
    });

    console.log('Admin user created:', admin.email);

    // Create a regular customer
    const customer = await User.create({
      name: 'John Customer',
      email: 'customer@example.com',
      password: 'customer123',
      phone: '9876543210',
      address: {
        street: '456 Customer Ave',
        city: 'Customer City',
        state: 'CS',
        zipCode: '67890'
      },
      role: 'customer',
    });

    console.log('Customer user created:', customer.email);

    // Create restaurants
    const restaurants = await Restaurant.create([
      {
        name: 'Pizza Paradise',
        description: 'Best Italian pizza in town with fresh ingredients',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
        },
        phone: '212-555-0123',
        email: 'info@pizzaparadise.com',
        cuisine: ['Italian', 'Pizza', 'Pasta'],
        openingTime: '10:00',
        closingTime: '23:00',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        isActive: true,
      },
      {
        name: 'Burger House',
        description: 'Gourmet burgers and American classics',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
        },
        phone: '310-555-0456',
        email: 'info@burgerhouse.com',
        cuisine: ['American', 'Burgers', 'Fast Food'],
        openingTime: '11:00',
        closingTime: '22:00',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500',
        isActive: true,
      },
      {
        name: 'Sushi Master',
        description: 'Authentic Japanese sushi and seafood',
        address: {
          street: '789 Cherry Blossom Ln',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
        },
        phone: '415-555-0789',
        email: 'info@sushimaster.com',
        cuisine: ['Japanese', 'Sushi', 'Seafood'],
        openingTime: '12:00',
        closingTime: '22:30',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500',
        isActive: true,
      },
    ]);

    console.log(`${restaurants.length} restaurants created`);

    // Create food items
    const foods = await Food.create([
      // Pizza Paradise items
      {
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
        price: 12.99,
        category: 'Main Course',
        restaurant: 'Pizza Paradise',
        restaurantId: restaurants[0]._id,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
        isAvailable: true,
        rating: 4.5,
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni with extra cheese and tomato sauce',
        price: 14.99,
        category: 'Main Course',
        restaurant: 'Pizza Paradise',
        restaurantId: restaurants[0]._id,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        isAvailable: true,
        rating: 4.8,
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon, eggs, and parmesan',
        price: 11.99,
        category: 'Main Course',
        restaurant: 'Pizza Paradise',
        restaurantId: restaurants[0]._id,
        image: 'https://images.unsplash.com/photo-1645112411342-4665a10c7c58?w=500',
        isAvailable: true,
        rating: 4.4,
      },
      {
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter and herbs',
        price: 4.99,
        category: 'Appetizer',
        restaurant: 'Pizza Paradise',
        restaurantId: restaurants[0]._id,
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500',
        isAvailable: true,
        rating: 4.3,
      },

      // Burger House items
      {
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheddar cheese, lettuce, tomato, and special sauce',
        price: 9.99,
        category: 'Main Course',
        restaurant: 'Burger House',
        restaurantId: restaurants[1]._id,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        isAvailable: true,
        rating: 4.6,
      },
      {
        name: 'Bacon Deluxe Burger',
        description: 'Double beef patty with crispy bacon, onion rings, and BBQ sauce',
        price: 12.99,
        category: 'Main Course',
        restaurant: 'Burger House',
        restaurantId: restaurants[1]._id,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
        isAvailable: true,
        rating: 4.7,
      },
      {
        name: 'Crispy Chicken Wings',
        description: 'Spicy buffalo wings with ranch dressing',
        price: 8.99,
        category: 'Appetizer',
        restaurant: 'Burger House',
        restaurantId: restaurants[1]._id,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
        isAvailable: true,
        rating: 4.4,
      },
      {
        name: 'Loaded Fries',
        description: 'Crispy fries topped with cheese, bacon, and green onions',
        price: 5.99,
        category: 'Appetizer',
        restaurant: 'Burger House',
        restaurantId: restaurants[1]._id,
        image: 'https://images.unsplash.com/photo-1585109649138-97581522cde8?w=500',
        isAvailable: true,
        rating: 4.5,
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Thick and creamy chocolate milkshake',
        price: 3.99,
        category: 'Beverage',
        restaurant: 'Burger House',
        restaurantId: restaurants[1]._id,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500',
        isAvailable: true,
        rating: 4.8,
      },

      // Sushi Master items
      {
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber roll',
        price: 8.99,
        category: 'Appetizer',
        restaurant: 'Sushi Master',
        restaurantId: restaurants[2]._id,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
        isAvailable: true,
        rating: 4.5,
      },
      {
        name: 'Spicy Tuna Roll',
        description: 'Fresh tuna with spicy mayo and cucumber',
        price: 10.99,
        category: 'Main Course',
        restaurant: 'Sushi Master',
        restaurantId: restaurants[2]._id,
        image: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=500',
        isAvailable: true,
        rating: 4.7,
      },
      {
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over pressed vinegar rice',
        price: 6.99,
        category: 'Main Course',
        restaurant: 'Sushi Master',
        restaurantId: restaurants[2]._id,
        image: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=500',
        isAvailable: true,
        rating: 4.6,
      },
      {
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu and seaweed',
        price: 3.99,
        category: 'Appetizer',
        restaurant: 'Sushi Master',
        restaurantId: restaurants[2]._id,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744e7d?w=500',
        isAvailable: true,
        rating: 4.3,
      },
      {
        name: 'Green Tea',
        description: 'Authentic Japanese green tea',
        price: 2.99,
        category: 'Beverage',
        restaurant: 'Sushi Master',
        restaurantId: restaurants[2]._id,
        image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500',
        isAvailable: true,
        rating: 4.4,
      },
    ]);

    console.log(`${foods.length} food items created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('Customer - Email: customer@example.com, Password: customer123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();