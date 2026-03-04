// models/Food.js
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300',
    },
    category: {
      type: String,
      default: 'Main Course',
    },
    restaurant: {
      type: String,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
     customizationOptions: {
      type: [String], // e.g., ["Extra Cheese", "No Onions", "Spicy Level"]
      default: []
    },
    allowSpecialInstructions: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);