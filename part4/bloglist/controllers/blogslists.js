// const mongoose = require('mongoose');
// const { request } = require('../app');
const Blog = require('../models/blogmodel');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogsList = await Blog.find({});

        response.json(blogsList);
    } catch (exception) {
        next(exception);
    }
    // Blog.find({})
    //     .then(result => {
    //         response.json(result);
    //     })
    //     .catch(error => {
    //         next(error);
    //     })
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const idToGet = request.params.id;

        const gotBlog = await Blog.findById(idToGet);
        logger.info(gotBlog)
        response.json(gotBlog);
    } catch (exception) {
        next(exception);
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const bloggy = request.body;
        const blogToAdd = new Blog(bloggy);
        const addedBlog = await blogToAdd.save();

        response.status(201).json(addedBlog);
    } catch (exception) {
        next(exception);
    }
    // const bloggy = request.body;
    // const blogToAdd = new Blog({
    //     name: bloggy.name,
    //     author: bloggy.author,
    //     url: bloggy.url,
    //     likes: bloggy.likes
    // })
    // logger.info(blogToAdd);
    // blogToAdd.save().then(result => response.status(201).json(result))
    //     .catch(error => {
    //         next(error);
    //     })
})

module.exports = blogsRouter;