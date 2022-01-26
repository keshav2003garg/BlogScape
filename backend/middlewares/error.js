const ErrorHandler = require("../utils/errorHandler");

const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name == "CastError") {
        err = new ErrorHandler(404, "Invalid ID");
    }
    if (err.code == 11000) {
        if (Object.keys(err.keyPattern) == 'email') {
            err = new ErrorHandler(400, "User with this Email ID already exists");
        }
        else if (Object.keys(err.keyPattern) == 'username') {
            err = new ErrorHandler(400, "Username already taken");
        }
    }
    if (err.errors) {
        if (err.errors.name) {
            err = new ErrorHandler(400, err.errors.name.message);
        }
        else if (err.errors.username) {
            err = new ErrorHandler(400, err.errors.username.message);
        }
        else if (err.errors.email) {
            err = new ErrorHandler(400, err.errors.email.message);
        }
        else if (err.errors.password) {
            err = new ErrorHandler(400, err.errors.password.message);
        }
        else if (err.errors["img.url"] || error.errors["img.public_id"]) {
            err = new ErrorHandler(400, "Please upload an image");
        }
        else if (error.errors.categories) {
            err = new ErrorHandler(400, err.errors.categories.message);
        }
        else if (error.errors.title) {
            err = new ErrorHandler(400, err.errors.title.message);
        }
        else if (error.errors.date) {
            err = new ErrorHandler(400, err.errors.date.message);
        }
        else if (error.errors.description) {
            err = new ErrorHandler(400, err.errors.description.message);
        }
        else if (error.errors.user) {
            err = new ErrorHandler(400, err.errors.user.message);
        }
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

module.exports = error;