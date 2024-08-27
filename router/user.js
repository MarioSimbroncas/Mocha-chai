const router = require("express").Router();
const { createUser, getUsers } = require("../controller/user");

// Creating a route to create a user
router.post("/createuser", createUser);
// Creating a route to get all users
router.get("/users", getUsers);

module.exports = router;
