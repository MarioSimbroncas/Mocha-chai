const router = require("express").Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

// Creating a route to create a user
router.post("/createuser", createUser);
// Creating a route to get all users
router.get("/users", getUsers);
// Creating a route to get a single user
router.get("/singleuser/:userid", getSingleUser);
// Creating a route to delete a user
router.delete("/deleteuser/:userid", deleteUser);
// Creating a route to update a user
router.put("/updateuser/:userid", updateUser);

module.exports = router;
