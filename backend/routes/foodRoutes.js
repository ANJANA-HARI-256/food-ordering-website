// routes/foodRoutes.js
const express = require("express");
const Food = require("../models/Food");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all foods with optional filtering
router.get("/", async (req, res) => {
  try {
    const { restaurant } = req.query;
    let query = {};
    if (restaurant) {
      query.restaurant = restaurant;
    }
    const foods = await Food.find(query);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single food
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add food (admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update food (admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      Object.assign(food, req.body);
      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete food (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      await food.deleteOne();
      res.json({ message: "Food removed" });
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;