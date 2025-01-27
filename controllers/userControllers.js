const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc Register a new user
// @route POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email already exist");
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    res.status(200).json({ message: "sucessfully regist new user" });
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if email and password is provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    //check if user exist
    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    //check if password match
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
    });
    res.status(200).json({ token });
});

// @desc Get user profile
// @route GET /api/users/current
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userData = await User.findById(req.user.id).select("-password");
    res.status(200).json({ data: userData });
});
module.exports = { registerUser, loginUser, getUserProfile };
