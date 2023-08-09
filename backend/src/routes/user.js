const express = require("express");
const router = express.Router();

const user = require("@controllers/user.js");
const auth = require("@middleware/auth.js");

router.get("/users/:id", auth.auth, user.getUserById);

router.get("/users", auth.auth, user.getUsers);

router.post("/users/signup", user.signup);

router.post("/users/signin", user.signin);

router.delete("/users/:id", auth.auth, user.deleteUser);

router.patch("/users/:id", auth.auth, user.updateUser);

module.exports = router;
