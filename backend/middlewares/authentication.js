const jwt = require('jsonwebtoken');

const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/user.model');

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { authToken } = req.cookies;
    if (!authToken) {
        return next(new ErrorHandler(401, "Please login first"));
    }
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = await User.findById(data.id);
    next();
})

module.exports = { isAuthenticated };