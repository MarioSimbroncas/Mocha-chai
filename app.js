// Importing express module
const express = require("express");
// Creating express app
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creating a route
app.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});

app.get("/contact", (req, res) => {
  res.send("Welcome to the contact page");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
