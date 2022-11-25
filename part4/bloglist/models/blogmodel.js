const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: Number
})

// const Blog = mongoose.model('Blog', blogSchema);

module.exports = mongoose.model('Blog', blogSchema);