const router = require("express").Router();
const { createUser } = require("../controller/user");

router.post("/createuser", createUser);

module.exports = router;
