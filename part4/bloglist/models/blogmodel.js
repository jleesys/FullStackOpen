const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    author: String,
    url: String,
    likes: Number
})

// const Blog = mongoose.model('Blog', blogSchema);

module.exports = mongoose.model('Blog', blogSchema);