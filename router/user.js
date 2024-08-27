const router = require("express").Router();
const { createUser, getUsers, getSingleUser } = require("../controller/user");

// Creating a route to create a user
router.post("/createuser", createUser);
// Creating a route to get all users
router.get("/users", getUsers);
// Creating a route to get a single user
router.get("/singleuser/:userid", getSingleUser);

module.exports = router;
