const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const tokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            req.user = decoded;
            next();
        });
    }
});

module.exports = tokenHandler;
