const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

//User authentication
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

//Food partner authentication
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.loginFoodPartner);
router.get("/foodpartner/logout", authController.logoutFoodPartner);
module.exports = router;
