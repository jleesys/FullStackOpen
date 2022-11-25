// const mongoose = require('mongoose');
// const { request } = require('../app');
const Blog = require('../models/blogmodel');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');

blogsRouter.get('/', (request, response) => {
    response
        .send(`<h1>Waldo!</h1>`)
})

blogsRouter.post('/', (request, response, next) => {
    console.log('are you seeing this');
    // const requestedBlog = request.body;
    const blogToAdd = new Blog(request.body);
    logger.info(blogToAdd);
    blogToAdd.save().then(result => response.json(result))
    // logger.info(requestedBlog);
    // const newBlog = new Blog({
    //     name: requestedBlog.name,
    //     author: requestedBlog.author,
    //     url: requestedBlog.url,
    //     likes: requestedBlog.likes
    // })
})

module.exports = blogsRouter;