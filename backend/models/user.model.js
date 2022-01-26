const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [4, "Name should have more than 4 characters"],
        maxlength: [30, "Name cannot exceeds 30 characters"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: [true, "Username already exists"],
        minlength: [4, "Username should have more than 4 characters"],
        maxlength: [30, "Username cannot exceeds 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    about: {
        type: String,
    },
    socials: {
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        pinterest: {
            type: String,
        }
    },
    categories: [{
        type: String
    }],
    otp: {
        type: Number,
    },
    otpExpiry: {
        type: Date
    },
    noOfFailedAttemps: {
        type: Number,
        default: 0
    },
    noOfFailedAttempsExpiry: {
        type: Date
    },
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    failedLoginAttemptsExpiry: {
        type: Date
    },
    resetPasswordOtp: {
        type: Number,
    },
    resetPasswordExpiry: {
        type: Date,
    },
    blockedIPs: [{
        type: String
    }]
});

module.exports = mongoose.model('user', userSchema);