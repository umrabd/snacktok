const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = app;