const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
router.post("/user/register", authController.registerUser);

module.exports = router;
