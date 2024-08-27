const User = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    // Get the data from the request body
    const { first_name, middle_name, last_name, email, phone, password } =
      req.body;
    // Validate parameters
    const requiredFields = ["first_name", "last_name", "email", "password"];
    // Check if all required fields are present
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    // If any required field is missing, send an error response
    if (missingFields.length) {
      return res.status(400).json({
        message: "Missing required fields",
        error: `Required fields are: ${missingFields.join(", ")}`,
      });
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email",
          error: "Email format is incorrect",
        });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
          error: "A user with this email already exists",
        });
      }
    }
    // Values to be inserted in the database
    const data = {
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
    };
    // Create a new user
    const user = new User(data);
    // Save the user
    const result = await User.create(user);
    // Send the response
    res.status(201).json({ message: "User created successfully", result });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message, error: "Something went wrong" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ create_time: "descending" });
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message, error: "Something went wrong" });
  }
};
