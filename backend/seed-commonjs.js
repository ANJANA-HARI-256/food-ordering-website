// seed-commonjs.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Food = require('./models/Food');
const Restaurant = require('./models/Restaurant');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
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
      address: '123 Admin St, Admin City, AS 12345',
      role: 'admin',
    });

    console.log('Admin user created:', admin.email);

    // Create a regular customer
    const customer = await User.create({
      name: 'John Customer',
      email: 'customer@example.com',
      password: 'customer123',
      phone: '9876543210',
      address: '456 Customer Ave, Customer City, CS 67890',
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
      }
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
      }
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