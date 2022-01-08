const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = await User.findById(data.id);
        next();
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        };
    }
}

module.exports = { isAuthenticated };