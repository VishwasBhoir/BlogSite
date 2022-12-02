const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Post with this title already exist!'],
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    blog: {
        type: String,
        require: true,
    },

    username: {
        type: String,
        require: true,
    },
    datePosted: {
        type: Date,
        default: new Date(),
    },
    image: String
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
