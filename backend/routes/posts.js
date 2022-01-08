const express = require('express');
const router = express.Router();

const sendEmail = require('../utils/sendEmail');
const Post = require('../models/post.model');
const { isAuthenticated } = require('../middlewares/authentication');


router.post('/create-post', isAuthenticated, async (req, res) => {
    try {
        const { img, title, description } = req.body;

        const post = await Post.create({
            user: req.user,
            img: img,
            title: title,
            description: description
        });

        res.status(201).json({
            success: true,
            message: `Post created successfully`,
            post: post
        })
    } catch (error) {
        if (!res.headersSent) {
            if (error.errors != undefined) {
                if (error.errors["img.url"] || error.errors["img.public_id"]) {
                    res.status(500).json({
                        success: false,
                        message: `Please upload an image`
                    })
                }
                else if (error.errors.categories) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.categories.message,
                    })
                }
                else if (error.errors.title) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.title.message,
                    })
                }
                else if (error.errors.date) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.date.message,
                    })
                }
                else if (error.errors.description) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.description.message,
                    })
                }
                else if (error.errors.user) {
                    res.status(500).json({
                        success: false,
                        message: error.errors.user.message,
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
                        message: `${Object.keys(error.keyPattern)} should be unique`,
                    })
                }
            }
        }
    }
})


router.get('/get-all-posts', async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name");
        res.status(200).json({
            success: true,
            posts: posts
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


router.get('/my-posts', isAuthenticated, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).populate("user", "name");
        if (!posts) {
            res.status(400).json({
                success: false,
                message: `No post Found`,
            })
            return;
        }
        res.status(200).json({
            success: true,
            posts: posts
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


router.post('/update-post/:id', isAuthenticated, async (req, res) => {
    try {
        const { img, categories, title, description } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id, { img, categories, title, description });
        if (!post) {
            res.status(400).json({
                success: false,
                message: `No post Found`,
            })
        }

        res.status(200).json({
            success: true,
            posts: post
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

router.post('/delete-post/:id', isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(400).json({
                success: false,
                message: `No post Found`,
            })
        }

        res.status(200).json({
            success: true,
            posts: post
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

module.exports = router;