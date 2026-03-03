// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  phone: String,
  email: String,
  cuisine: [String],
  openingTime: String,
  closingTime: String,
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);