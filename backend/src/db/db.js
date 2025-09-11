const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://umrabd:6gEUK7oeUJs8GC22@snacktok.psij0h9.mongodb.net/?retryWrites=true&w=majority&appName=snacktok";

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


