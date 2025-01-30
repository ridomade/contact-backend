const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    // get the data from the request body
    const { username, email, password } = req.body;

    // Array to store missing fields
    const missingFields = [];
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        //check if username, email and password is provided
        res.status(400); // bad request
        throw new Error(`Please fill all the fields: ${missingFields.join(", ")}`); // throw an error from error handler
    }
    //check if email already exist (from the database)
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400); // bad request
        throw new Error("Email already exist"); // throw an error from error handler
    }
    //hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    // status success (OK), send the response
    res.status(200).json({ message: "sucessfully regist new user", data: user });
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Array to store missing fields
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (missingFields.length > 0) {
        res.status(400); // bad request
        throw new Error(`Please fill all the fields: ${missingFields.join(", ")}`); // throw an error from error handler
    }
    const user = await User.findOne({ email });
    //check if user exist
    if (!user) {
        res.status(400); // bad request
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    //check if password match
    if (!isMatch) {
        res.status(400); // bad request
        throw new Error("Invalid credentials");
    }
    //generate token using jwt
    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
    });
    // status success (OK)
    res.status(200).json({ token });
});

// @desc Get user profile
// @route GET /api/users/current
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userData = await User.findById(req.user.id).select("-password");
    // status success (OK)
    res.status(200).json({ data: userData });
});

// @desc Delete user by id and its contacts
// @route DELETE /api/users/:id
// @access Private
const deteletUserbyId = asyncHandler(async (req, res) => {
    const userId = await User.findById(req.params.id);

    if (req.params.id != req.user.id) {
        res.status(403); // Forbidden
        throw new Error("You do not have permission to delete this user");
    }

    if (!userId) {
        res.status(404); // not found
        throw new Error("User not found");
    }
    console.log(userId);
    console.log(req.params.id);
    console.log(req.user.id);
    await Contact.deleteMany({ user_id: userId });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User and its contacts deleted", data: userId });
});
// Export the functions
module.exports = { registerUser, loginUser, getUserProfile, deteletUserbyId };
