const express = require("express");
const router = express.Router();
const tokenHandler = require("../middleware/tokenHandler");

const {
    registerUser,
    loginUser,
    getUserProfile,
    deteletUserbyId,
} = require("../controllers/userControllers");

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/current", tokenHandler, getUserProfile)
    .delete("/:id", tokenHandler, deteletUserbyId);

module.exports = router;
