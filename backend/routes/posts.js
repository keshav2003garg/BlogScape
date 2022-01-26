const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authentication');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');
const Post = require('../models/post.model');


router.post('/create-post', isAuthenticated, asyncHandler(async (req, res, next) => {
    const { img, title, description, date } = req.body;

    const post = await Post.create({
        user: req.user,
        img: img,
        title: title,
        description: description,
        date: date
    });

    res.status(201).json({
        success: true,
        message: `Post created successfully`,
        post: post
    })
}))


router.get('/get-all-posts', asyncHandler(async (req, res, next) => {
    const posts = await Post.find().populate("user", "name");
    res.status(200).json({
        success: true,
        posts: posts
    })
}))


router.get('/get-post-details/:id', asyncHandler(async (req, res, next) => {
    const posts = await Post.findById(req.params.id).populate("user", "name");
    res.status(200).json({
        success: true,
        postDetails: posts
    })
}))


router.get('/my-posts', isAuthenticated, asyncHandler(async (req, res, next) => {
    const posts = await Post.find({ user: req.user.id }).populate("user", "name");
    if (!posts) {
        return next(new ErrorHandler(404, "No post Found"));
    }
    res.status(200).json({
        success: true,
        posts: posts
    })
}))


router.post('/update-post/:id', isAuthenticated, asyncHandler(async (req, res, next) => {
    const { img, categories, title, description } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { img, categories, title, description });
    if (!post) {
        return next(new ErrorHandler(404, "No post Found"));
    }

    res.status(200).json({
        success: true,
        message: "Post Updated Successfully"
    })
}))


router.delete('/delete-post/:id', isAuthenticated, asyncHandler(async (req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return next(new ErrorHandler(404, "No post Found"));
    }

    res.status(200).json({
        success: true,
        message: "Post Deleted Successfully"
    })
}))

module.exports = router;