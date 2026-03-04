// routes/couponRoutes.js
const express = require('express');
const Coupon = require('../models/Coupon');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Get all active coupons (public - for checkout page)
router.get('/active', protect, async (req, res) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
      $or: [
        { usageLimit: null },
        { usedCount: { $lt: '$usageLimit' } }
      ]
    }).select('-usedCount -__v');
    
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate a coupon
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, orderAmount, restaurantId } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Invalid coupon code' });
    }
    
    // Check if coupon is valid
    if (!coupon.isValid()) {
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    }
    
    // Check minimum order amount
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ 
        valid: false, 
        message: `Minimum order amount of $${coupon.minOrderAmount} required` 
      });
    }
    
    // Check if applicable to this restaurant
    if (coupon.applicableRestaurants.length > 0 && restaurantId) {
      if (!coupon.applicableRestaurants.includes(restaurantId)) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Coupon not applicable for this restaurant' 
        });
      }
    }
    
    // Check user usage (you'll need to track this in Order model)
    // This will be implemented when applying coupon to order
    
    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    } else {
      discountAmount = Math.min(coupon.discountValue, orderAmount);
    }
    
    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discountAmount,
        finalAmount: orderAmount - discountAmount
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create coupon
router.post('/', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all coupons
router.get('/', protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort('-createdAt');
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update coupon
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      Object.assign(coupon, req.body);
      const updated = await coupon.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete coupon
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      await coupon.deleteOne();
      res.json({ message: 'Coupon removed' });
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;