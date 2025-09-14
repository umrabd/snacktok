const foodModel = require("../models/food.model");

// Get all food items
async function getAllFoods(req, res) {
  try {
    const foods = await foodModel.find().populate('foodPartner', 'name email');
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get a single food item by ID
async function getFoodById(req, res) {
  try {
    const { id } = req.params;
    const food = await foodModel.findById(id).populate('foodPartner', 'name email');
    
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new food item
async function createFood(req, res) {
  try {
    const { name, video, description, foodPartner } = req.body;
    
    const food = await foodModel.create({
      name,
      video,
      description,
      foodPartner
    });
    
    res.status(201).json({
      message: "Food item created successfully",
      food
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update a food item
async function updateFood(req, res) {
  try {
    const { id } = req.params;
    const { name, video, description, foodPartner } = req.body;
    
    const food = await foodModel.findByIdAndUpdate(
      id,
      { name, video, description, foodPartner },
      { new: true, runValidators: true }
    ).populate('foodPartner', 'name email');
    
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    res.status(200).json({
      message: "Food item updated successfully",
      food
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a food item
async function deleteFood(req, res) {
  try {
    const { id } = req.params;
    
    const food = await foodModel.findByIdAndDelete(id);
    
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    res.status(200).json({
      message: "Food item deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
