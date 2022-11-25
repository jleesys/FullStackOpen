// const mongoose = require('mongoose');
// const { request } = require('../app');
const Blog = require('../models/blogmodel');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            next(error);
        })
})

blogsRouter.post('/', (request, response, next) => {
    const bloggy = request.body;
    const blogToAdd = new Blog({
        name: bloggy.name,
        author: bloggy.author,
        url: bloggy.url,
        likes: bloggy.likes
    })
    logger.info(blogToAdd);
    blogToAdd.save().then(result => response.status(201).json(result))
        .catch(error => {
            next(error);
        })
})

module.exports = blogsRouter;