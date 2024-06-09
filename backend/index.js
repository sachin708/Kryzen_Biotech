
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/connection");
dotenv.config();

const app = express();

const port = process.env.PORT
app.listen(port, async() => {
    try {
        await connectDB();
        console.log("Connected to the DB");
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        console.log(err.message);
    }
});