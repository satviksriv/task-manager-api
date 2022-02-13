require("dotenv").config();
console.log(process.env.JWT_SECRET);
const mongoose = require("mongoose");

//* Connecting to database
mongoose.connect(process.env.MONGODB_URL);