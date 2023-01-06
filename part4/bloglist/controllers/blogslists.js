// const mongoose = require('mongoose');
// const { request } = require('../app');
const Blog = require('../models/blogmodel');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogsList = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });

        response.json(blogsList);
    } catch (exception) {
        next(exception);
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const idToGet = request.params.id;

        const gotBlog = await Blog.findById(idToGet);
        if (gotBlog) {
            logger.info(gotBlog)
            response.json(gotBlog);
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
})

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    // console.log('hitting auth token valid\n', authorization);
    if (!authorization) return null;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // console.log('found token and returning substring ', authorization.substring(7))
        return authorization.substring(7);
    }
    return null;
}

blogsRouter.post('/', async (request, response, next) => {
    try {
        // const { username, password } = request.body;
        // const user = await User.findOne({ username });
        // const passwordMatch = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        // if (!(passwordMatch && user)) {
        //     return response.status(401).json({ error: 'invalid username/password' });
        // }
        const token = getTokenFrom(request);
        const decodedToken = token === null ? false : jwt.verify(token, process.env.SECRET);
        if (!(token && decodedToken.id)) {
            return response.status(401).json({ error: 'invalid or expired token' });
        }
        const user = await User.findById(decodedToken.id);

        const blogToAdd = new Blog({
            name: request.body.name,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id
        });

        const savedBlog = await blogToAdd.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception);
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const idToDel = request.params.id;

        const deletedBlog = await Blog.findByIdAndDelete(idToDel);
        logger.info('info passed ', deletedBlog);
        // deletedBlog ? response.status(200).json(deletedBlog) : response.status(400).end();
        deletedBlog ? response.status(204).end() : response.status(400).end();
        // response.status(204).end();
    } catch (exception) {
        next(exception);
    }
})

// updates blog doc -- specifically likes
blogsRouter.put('/:id', async (request, response, next) => {
    const updatedBlog = {
        ...request.body, likes: request.body.likes
    }

    // console.log('logging ', updatedBlog)

    try {
        const blogToPut = new Blog(updatedBlog);
        // const queryResponse = await Blog.findByIdAndUpdate(updatedBlog.id, updatedBlog, { new: true });
        const queryResponse = await Blog.findByIdAndUpdate(updatedBlog.id, { likes: updatedBlog.likes }, { new: true });

        // console.log(queryResponse);

        if (queryResponse) {
            response.status(200).json(queryResponse);
        } else {
            response.status(400).end();
        }
    } catch (exception) {
        next(exception);
    }
})

module.exports = blogsRouter;