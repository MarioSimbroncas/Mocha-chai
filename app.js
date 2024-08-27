// Importing express module
const express = require("express");
// Creating express app
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing the database connection
require("./model/db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creating a route
app.use("/api", require("./router/user"));

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
