const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });
  if (userAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  try {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("JWT signing error:", error);
    res.status(500).json({ message: "Internal server error during token generation" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  
  try {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("JWT signing error:", error);
    res.status(500).json({ message: "Internal server error during token generation" });
  }
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}

//Food partner authentication

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isAccountAlreadyExists = await foodpartnerModel.findOne({ email });
  if (isAccountAlreadyExists){
    return res.status(400).json({ message: "Account already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodpartner = await foodpartnerModel.create({
    name,
    email,
    password: hashedPassword,
  })
  try {
  const token = jwt.sign({ id: foodpartner._id }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token);
  res.status(201).json({
    message: "Food partner created successfully",
    _id: foodpartner._id,
    name: foodpartner.name,
    email: foodpartner.email,
    token: token,
  });
} catch (error) {
  console.error("JWT signing error:", error);
  res.status(500).json({ message: "Internal server error during token generation" });
}
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodPartner = await foodpartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid credentials" });

  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  try {
    const token = jwt.sign({ id: foodPartner._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({
      message: "Food partner logged in successfully",
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      token: token,
    });
  } catch (error) {
    console.error("JWT signing error:", error);
    res.status(500).json({ message: "Internal server error during token generation" });
  }
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Food partner logged out successfully" });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };