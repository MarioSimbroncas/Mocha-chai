const mongoose = require("mongoose");
require("dotenv").config();

// Creating a function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.localdb, {
    //   useNewUrlParser: true, TODO: DeprecationWarning: current URL string parser is deprecated
    //   useUnifiedTopology: true, TODO: DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("Error in connecting to database", err);
  }
}

// Exporting the connectDB function
connectDB();