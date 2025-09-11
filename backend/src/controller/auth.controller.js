const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "02b845658eb2b9c129ba1223f07a85d3";

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
  const token = jwt.sign({ id: user._id }, JWT_SECRET,{expiresIn: "1h"}) ;
  res.cookie("token", token)
  res.status(201).json({ message: "User created successfully", 
_id: user._id,
fullName: user.fullName,
email: user.email,
token: token,
   });
}

module.exports = { registerUser };