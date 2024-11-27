const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJwtToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify token
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded._id; // Attach user ID to request
        next();
    } catch (error) {
        console.error("JWT verification error:", error); // Log error for debugging

        if (error.name === "TokenExpiredError") {
            // Handle token expiration
            return res.status(401).json({
                message: "Token expired. Please refresh your token.",
                error: "TokenExpired",
            });
        }

        return res.status(401).json({ message: "Access denied. Invalid token." });
    }
};
