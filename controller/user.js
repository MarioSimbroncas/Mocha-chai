const User = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    // Get the data from the request body
    const { first_name, middle_name, last_name, email, phone, password } =
      req.body;
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
