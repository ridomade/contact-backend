const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const tokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }

    token = authHeader.split(" ")[1];

    // Verify the token (If verification fails, it will automatically throw an error)
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    req.user = decoded; // Attach decoded user data to request
    next();
});

module.exports = tokenHandler;
