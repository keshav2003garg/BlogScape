const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "Please enter userID"],
    },
    img: {
        public_id: {
            type: String,
            required: [true, "Please enter image publicID"],
        },
        url: {
            type: String,
            required: [true, "Please enter image URL"],
        }
    },
    categories: [{
        type: String,
        default: "General"
    }],
    title: {
        type: String,
        required: [true, "Please enter title"],
        unique: [true, "Title should be unique"],
        minlength: [5, "Title should have more than 5 characters"],
        maxlength: [50, "Title cannot exceeds 50 characters"],
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
        minlength: [15, "Description should have more than 15 characters"],
    }
});

module.exports = mongoose.model('post', postSchema);