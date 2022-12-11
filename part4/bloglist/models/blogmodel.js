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
    // likes: Number
    likes: {
        type: Number,
        default: 0
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
// const Blog = mongoose.model('Blog', blogSchema);

module.exports = mongoose.model('Blog', blogSchema);