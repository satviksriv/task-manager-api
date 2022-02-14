require("dotenv").config();
const mongoose = require("mongoose");

//* Connecting to database
mongoose.connect(process.env.MONGODB_URL);