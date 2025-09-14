const express = require("express");
const router = express.Router();
const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} = require("../controller/food.controller");

// GET /api/foods - Get all food items
router.get('/', getAllFoods);

// GET /api/foods/:id - Get a specific food item
router.get('/:id', getFoodById);

// POST /api/foods - Create a new food item
router.post('/', createFood);

// PUT /api/foods/:id - Update a food item
router.put('/:id', updateFood);

// DELETE /api/foods/:id - Delete a food item
router.delete('/:id', deleteFood);

module.exports = router;