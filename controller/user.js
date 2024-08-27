const User = require("../model/User");

// Creating a function to create a user
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
    // Validate the email
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

// Creating a function to get all users
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

// Creating a function to get a single user
exports.getSingleUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { userid } = req.params;
    // Validate the user ID
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const userQuery = { _id: userid };
    // Find the user by ID
    const user = await User.findOne(userQuery);
    // If the user is not found, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Send the response
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message, error: "Something went wrong" });
  }
};

// Creating a function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { userid } = req.params;
    // Validate the user ID
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const userQuery = { _id: userid };
    // Find the user by ID
    const user = await User.findOne(userQuery);
    // If the user is not found, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the user
    await User.deleteOne(userQuery);
    // Send the response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message, error: "Something went wrong" });
  }
};

// Creating a function to update a user
exports.updateUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { userid } = req.params;
    // Validate the user ID
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const userQuery = { _id: userid };
    // Find the user by ID
    const user = await User.findOne(userQuery);
    // If the user is not found, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Get the data from the request body
    const { first_name, middle_name, last_name, email, phone, password } =
      req.body;
    // Validate parameters
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email",
          error: "Email format is incorrect",
        });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userid) {
        return res.status(400).json({
          message: "Email already exists",
          error: "A user with this email already exists",
        });
      }
    }
    // Values to be updated in the database
    const data = {
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      password,
    };
    // Update the user
    await User.updateOne(userQuery, data);
    // Find the updated user
    const updateUser = await User.findOne(userQuery);
    // Send the response
    res.status(200).json({ message: "User updated successfully", updateUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, error: "Something went wrong" });
  }
};
