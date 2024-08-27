const mongoose = require("mongoose");
require("dotenv").config();

// Creating a function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.localdb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("Error in connecting to database", err);
  }
}

// Exporting the connectDB function
connectDB();