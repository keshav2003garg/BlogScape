const jwt = require('jsonwebtoken');

const sentjwt = (res, user, message, statusCode) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    const options = {expires: new Date(Date.now() + process.env.COOKIE_EXPIRY*24*60*60*1000), httpOnly: true };

    res.status(statusCode).cookie("authToken", token, options).json({
        success: true,
        message: message,
        authToken: token
    });
}

module.exports = sentjwt;