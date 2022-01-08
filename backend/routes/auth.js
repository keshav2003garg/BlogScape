const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');
const sendjwt = require('../utils/sendjwt');
const User = require('../models/user.model');
const { isAuthenticated } = require('../middlewares/authentication');


router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!password) {
            res.status(401).json({
                success: false,
                message: "Please enter Password first",
            });
            return;
        }
        if (password.length < 8) {
            res.status(401).json({
                success: false,
                message: `Your Password length is ${password.length} and it should be greater than 8 characters`,
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const otp = Math.ceil(100000 + (100 - (100 - (999999 - 100000))) * Math.random());

        const user = await User.create({
            name: name,
            username: username,
            email: email,
            password: securedPassword,
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

        const userId = user.id;

        res.status(201).json({
            success: true,
            message: `OTP sent to ${user.email} successfully`,
            userId: userId
        })
    } catch (error) {
        if (!res.headersSent) {
            if (error.errors != undefined) {
                if (error.errors.name) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.name.message,
                    })
                }
                else if (error.errors.username) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.username.message,
                    })
                }
                else if (error.errors.email) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.email.message,
                    })
                }
                else if (error.errors.password) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.password.message,
                    })
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
            }
            else {
                if (error.code == 11000) {
                    res.status(500).json({
                        success: false,
                        message: `${Object.keys(error.keyPattern)} already exists`,
                    })
                }
            }
        }
    }
})


router.post('/verify-otp/:userId', async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            res.status(401).json({
                success: false,
                message: "Please enter OTP first",
            });
            return;
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid UserID",
            });
            return;
        }

        if (user.otpExpiry < Date.now()) {
            user.otp = undefined;
            await user.save();
            res.status(400).json({
                success: false,
                message: `OTP is Expired. You can request a new one`,
            });
            return;
        }
        if (otp != user.otp) {
            res.status(400).json({
                success: false,
                message: `You entered Incorrect OTP`,
            })
        }
        else {
            user.otp = undefined;
            user.otpExpiry = undefined;
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
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.get('/otp-verification-failed/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid UserID",
            });
            return;
        }
        await user.delete();

        res.status(400).json({
            success: true,
            message: `OTP Verification Failed. You can create your account again`,
            userId: req.params.userId
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.get('/resend-otp/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid UserID",
            });
            return;
        }

        const otp = Math.ceil(100000 + (100 - (100 - (999999 - 100000))) * Math.random());
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

        res.status(201).json({
            success: true,
            message: `OTP again sent to ${user.email} successfully`,
            userId: req.params.userId
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!password) {
            res.status(401).json({
                success: false,
                message: "Please enter Password first",
            });
            return;
        }
        if (password.length < 8) {
            res.status(401).json({
                success: false,
                message: `Your Password length is ${password.length} and it should be greater than 8 characters`,
            });
            return;
        }

        const user = await User.findOne({ email: email }).select("+password") || await User.findOne({ username: username }).select("+password");
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
            return;
        }
        if (user.otp == undefined && user.otpExpiry == undefined) {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                res.status(401).json({
                    success: false,
                    message: "Invalid Credentials",
                });
                return;
            };

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
            res.status(400).json({
                success: false,
                message: `Please, first verify OTP sended on ${email}`,
            });
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(401).json({
                success: false,
                message: "Please enter Email first",
            });
            return;
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "No user exist with given Email address",
            });
            return;
        };

        const otp = Math.ceil(100000 + (100 - (100 - (999999 - 100000))) * Math.random());
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

        const userId = user.id;

        res.status(201).json({
            success: true,
            message: `Reset Password OTP sent to ${user.email} successfully`,
            userId: userId
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        };
    }
});


router.post('/verify-reset-password/:userId', async (req, res) => {
    try {
        let user = await User.findById(req.params.userId).select("+password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid UserID",
            });
            return;
        };

        const { otp, password, confirmPassword } = req.body;
        if (!otp) {
            res.status(401).json({
                success: false,
                message: "Please enter OTP first",
            });
            return;
        }
        if (!password) {
            res.status(401).json({
                success: false,
                message: "Please enter new Password first",
            });
            return;
        }
        if (!confirmPassword) {
            res.status(401).json({
                success: false,
                message: "Please enter your password again",
            });
            return;
        }
        if (password.length < 8) {
            res.status(401).json({
                success: false,
                message: `Your Password length is ${password.length} and it should be greater than 8 characters`,
            });
            return;
        }
        if (password != confirmPassword) {
            res.status(400).json({
                success: false,
                message: "Password doesn't match",
            });
            return;
        }

        if (user.resetPasswordExpiry < Date.now()) {
            user.resetPasswordOtp = undefined;
            await user.save();
            res.status(400).json({
                success: false,
                message: `OTP is Expired.`,
            })
            return;
        }
        if (user.resetPasswordOtp != otp) {
            res.status(400).json({
                success: false,
                message: `You entered Incorrect OTP`,
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            res.status(400).json({
                success: false,
                message: "Please enter a password which is different from your old password",
            });
            return;
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(password, salt);

            user.password = securedPassword;
            user.resetPasswordOtp = undefined;
            user.resetPasswordExpiry = undefined;
            await user.save();

            sendjwt(res, user, "Password Reset Successfully", 200);
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.get('/resend-reset-password-otp/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid UserID",
            });
            return;
        }

        const otp = Math.ceil(100000 + (100 - (100 - (999999 - 100000))) * Math.random());
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

        res.status(201).json({
            success: true,
            message: `Reset Password OTP again sent to ${user.email} successfully`,
            userId: req.params.userId
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.get('/check-user-status', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            userDetail: user,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.get('/logout', async (req, res) => {
    try {
        res.status(200).cookie("authToken", null, { expires: new Date(Date.now()) }).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        })
    }
})


module.exports = router;