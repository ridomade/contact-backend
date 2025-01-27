const express = require("express");
const router = express.Router();
const tokenHandler = require("../middleware/tokenHandler");

const { registerUser, loginUser, getUserProfile } = require("../controllers/userControllers");

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/current", tokenHandler, getUserProfile);

module.exports = router;
