const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

function connectDB() {
    mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
}

module.exports = connectDB ;


