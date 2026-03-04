// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        // Add these new fields for customization
        specialInstructions: {
          type: String,
          default: ''
        },
        customizations: [{
          name: String,
          price: Number,
          _id: false
        }],
        basePrice: {
          type: Number  // Original price before customizations
        },
        customizationCost: {
          type: Number,
          default: 0
        },
        _id: false
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']
    },
    couponApplied: {
      code: String,
      discountAmount: Number,
      discountType: String,
      _id: false
    },
    originalPrice: {
      type: Number  // Price before discount
    },
    paymentStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);