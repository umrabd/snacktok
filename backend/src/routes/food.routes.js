const express = require("express");
const router = express.Router();
const foodController = require("../controller/food.controller");
const authMiddleware = require("../middlewares/auth.middleware")

// GET /api/foods - Get all food items
router.get('/', foodController.getAllFoods);

// GET /api/foods/:id - Get a specific food item
router.get('/:id', foodController.getFoodById);

// POST /api/foods - Create a new food item
router.post('/', authMiddleware.authFoodPartnerMiddleware, foodController.createFood);

// PUT /api/foods/:id - Update a food item
router.put('/:id', foodController.updateFood);

// DELETE /api/foods/:id - Delete a food item
router.delete('/:id', foodController.deleteFood);

module.exports = router;