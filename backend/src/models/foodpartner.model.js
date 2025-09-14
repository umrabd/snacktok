const mongoose = require("mongoose");

const foodpartnerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
    
})

const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema);

module.exports = foodpartnerModel;