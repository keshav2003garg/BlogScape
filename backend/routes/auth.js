const express = require('express');
const router = express.Router();

const sendEmail = require('../utils/sendEmail');
const sendjwt = require('../utils/sendjwt');
const generateOTP = require('../utils/generateOtp');
const { generateHash, matchPassword } = require('../utils/passwordHandler');
const sendResponse = require('../utils/sendResponse');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const { isAuthenticated } = require('../middlewares/authentication');
const User = require('../models/user.model');


router.post('/register', asyncHandler(async (req, res, next) => {
    const { name, username, email, password } = req.body;
    if (!password) {
        return next(new ErrorHandler(400, "Please enter Password first"));
    }
    if (password.length < 8) {
        return next(new ErrorHandler(400, `Your Password length is ${password.length} and it should be greater than 8 characters`));
    }

    const securedPassword = await generateHash(password);

    const otp = generateOTP(6);

    const user = await User.create({
        name: name,
        username: username,
        email: email,
        password: securedPassword,
        avatar: {
            public_id: '',
            url: ''
        },
        about: '',
        socials: {
            facebook: '',
            instagram: '',
            pinterest: '',
            twitter: ''
        },
        categories: [],
        otp: otp,
        otpExpiry: Date.now() + 15 * 60 * 1000
    });

    await sendEmail({
        email: email,
        subject: "OTP Verification of MERN Blog",
        message: {
            sendingFor: "verifyEmail",
            otp: otp
        }
    })

    sendResponse(res, 201, `OTP sent to ${user.email} successfully`, { userId: user.id })
}))


router.post('/verify-otp/:userId', asyncHandler(async (req, res, next) => {
    const { otp } = req.body;
    if (!otp) {
        return next(new ErrorHandler(400, "Please enter OTP first"));
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
        return next(new ErrorHandler(404, "Invalid UserID"));
    }

    if (user.otpExpiry < Date.now()) {
        user.otp = undefined;
        await user.save();
        return next(new ErrorHandler(401, "OTP is Expired. You can request a new one"));
    }
    if (otp != user.otp) {
        user.noOfFailedAttemps += 1;
        await user.save();
        if (user.noOfFailedAttemps == 3) {
            return next(new ErrorHandler(401, "You entered Incorrect OTP. Last Attempt"));
        }
        if (user.noOfFailedAttemps == 4) {
            user.noOfFailedAttempsExpiry = Date.now() + 5 * 60 * 1000;
            await user.save();
            return next(new ErrorHandler(401, "You entered Incorrect OTP 4 times. Try after 5min"));
        }
        else if (user.noOfFailedAttemps > 4) {
            if (user.noOfFailedAttempsExpiry < Date.now()) {
                user.noOfFailedAttemps = 0;
                user.noOfFailedAttempsExpiry = undefined;
                await user.save();
            }
            return next(new ErrorHandler(401, "You entered Incorrect OTP 4 times. Try after 5min"));
        }
        return next(new ErrorHandler(401, `You entered Incorrect OTP. ${4 - user.noOfFailedAttemps} Attempts left`));
    }
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.noOfFailedAttemps = undefined;
    user.noOfFailedAttempsExpiry = undefined;
    await user.save();

    await sendEmail({
        email: user.email,
        subject: "Welcome to MERN Blog",
        message: {
            sendingFor: "welcomeMail",
            username: user.username
        }
    })

    sendjwt(res, user, "Registered Successfully", 201);
}))


router.get('/delete-user/:userId', asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return next(new ErrorHandler(404, "Invalid UserID"));
    }

    await user.delete();

    sendResponse(res, 200, "User Deleted Successfully", { userId: req.params.userId });
}))


router.get('/resend-otp/:userId', asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return next(new ErrorHandler(404, "Invalid UserID"));
    }

    const otp = generateOTP(6);
    user.otp = otp;
    user.otpExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail({
        email: user.email,
        subject: "OTP Verification of MERN Blog",
        message: {
            sendingFor: "verifyEmail",
            otp: otp
        }
    })

    sendResponse(res, 201, `OTP again sent to ${user.email} successfully`, { userId: req.params.userId })
}))


router.post('/login', asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!password) {
        return next(new ErrorHandler(400, "Please enter Password first"));
    }
    if (password.length < 8) {
        return next(new ErrorHandler(400, `Your Password length is ${password.length} and it should be greater than 8 characters`));
    }

    const user = await User.findOne({ email: email }).select("+password") || await User.findOne({ username: username }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "Invalid Credentials"));
    }
    if(user.blockedIPs.includes(req.ip.split(':')[3])){
        return next(new ErrorHandler(401, "You entered incorrect password too many times. You blocked to login"));
    }
    if (!user.otp && !user.otpExpiry) {
        const isPasswordMatched = await matchPassword(password, user.password);
        if (!isPasswordMatched) {
            user.failedLoginAttempts += 1;
            await user.save();
            if (user.failedLoginAttempts == 3) {
                return next(new ErrorHandler(401, "Invalid Credentials. Last Attempt"));
            }
            if (user.failedLoginAttempts == 4) {
                user.failedLoginAttemptsExpiry = Date.now() + 5 * 60 * 1000;
                await user.save();
                return next(new ErrorHandler(401, "You entered Incorrect Credentials 4 times. Try after 5min"));
            }
            if (user.failedLoginAttempts == 10) {
                user.blockedIPs.push(req.ip.split(':')[3]);
                await user.save();
            }
            if (user.failedLoginAttempts > 4) {
                return next(new ErrorHandler(401, "You entered Incorrect Credentials 4 times. Try after 5min"));
            }
            if (user.failedLoginAttemptsExpiry < Date.now()) {
                user.failedLoginAttempts = 0;
                user.failedLoginAttemptsExpiry = undefined;
                await user.save();
            }
            return next(new ErrorHandler(401, `Invalid Credentials. ${4 - user.failedLoginAttempts} Attemps Left`));
        }
        if (user.failedLoginAttemptsExpiry > Date.now()) {
            return next(new ErrorHandler(401, `You entered Wrong password 4 times. Try after 5min`));
        }

        await sendEmail({
            email: user.email,
            subject: "New login to MERN Blog",
            message: {
                sendingFor: "loginAlert",
            }
        })
        sendjwt(res, user, "Login Successfully", 200);
    }
    else {
        return next(new ErrorHandler(401, `Please, first verify OTP sended on ${user.email}`)); F
    }
}))


router.post('/forgot-password', asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler(400, "Please enter Email first"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return next(new ErrorHandler(404, "No user exist with given Email address"));
    };

    const otp = generateOTP(6);
    user.resetPasswordOtp = otp;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail({
        email: email,
        subject: "OTP Verification of MERN Blog",
        message: {
            sendingFor: "forgotPassword",
            otp: otp
        }
    })

    sendResponse(res, 201, `Reset Password OTP sent to ${user.email} successfully`, { userId: user.id })
}));


router.post('/verify-reset-password/:userId', asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.userId).select("+password");
    if (!user) {
        return next(new ErrorHandler(404, "Invalid UserID"));
    }

    const { otp, password, confirmPassword } = req.body;
    if (!otp) {
        return next(new ErrorHandler(400, "Please enter OTP first"));
    }
    if (!password) {
        return next(new ErrorHandler(400, "Please enter new Password first"));
    }
    if (!confirmPassword) {
        return next(new ErrorHandler(400, "Please enter your password again"));
    }
    if (password.length < 8) {
        return next(new ErrorHandler(400, `Your Password length is ${password.length} and it should be greater than 8 characters`));
    }
    if (password != confirmPassword) {
        return next(new ErrorHandler(400, "Password doesn't match"));
    }

    if (user.resetPasswordExpiry < Date.now()) {
        user.resetPasswordOtp = undefined;
        await user.save();
        return next(new ErrorHandler(401, "OTP is Expired"));
    }
    if (user.resetPasswordOtp != otp) {
        return next(new ErrorHandler(401, "You entered Incorrect OTP"));
    }
    const isPasswordMatched = await matchPassword(password, user.password);
    if (isPasswordMatched) {
        return next(new ErrorHandler(400, "Please enter a password which is different from your old password"));
    }
    else {
        const securedPassword = await generateHash(password);

        user.password = securedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        sendjwt(res, user, "Password Reset Successfully", 200);
    }
}));


router.get('/resend-reset-password-otp/:userId', asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return next(new ErrorHandler(404, "Invalid UserID"));
    }

    const otp = generateOTP(6);
    user.resetPasswordOtp = otp;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail({
        email: user.email,
        subject: "OTP Verification of MERN Blog",
        message: {
            sendingFor: "forgotPassword",
            otp: otp
        }
    })

    sendResponse(res, 201, `Reset Password OTP again sent to ${user.email} successfully`, { userId: req.params.userId });
}))


router.get('/check-user-status', isAuthenticated, asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    sendResponse(res, 200, "No message", { userDetail: user })
}))


router.get('/logout', asyncHandler(async (req, res) => {
    res.status(200).cookie("authToken", null, { expires: new Date(Date.now()) }).json({
        success: true,
        message: "Logout Successfully"
    })
}))


router.put('/update-profile', isAuthenticated, asyncHandler(async (req, res, next) => {
    const { avatar, username, name, email, password, categories, socials, about } = req.body;

    const tempUser = await User.findById(req.user.id).select("+password");

    if (email != tempUser.email) {
        return next(new ErrorHandler(400, "You can't change your E-Mail Address"));
    }
    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists) {
        return next(new ErrorHandler(400, "Username already taken"));
    }
    if (!password) {
        return next(new ErrorHandler(400, "Please enter password to check authenticity"));
    }
    const isPasswordMatched = await matchPassword(password, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Wrong Password. Please enter correct password to update your details"));
    };

    const securedPassword = await generateHash(password);

    const user = await User.findByIdAndUpdate(req.user.id, { avatar, username, name, email, categories, socials, about, password: securedPassword });

    sendResponse(res, 200, "Details Updated Successfully", { userDetail: user })
}))

module.exports = router;