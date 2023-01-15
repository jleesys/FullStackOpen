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

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization');
//     // console.log('hitting auth token valid\n', authorization);
//     if (!authorization) return null;
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         // console.log('found token and returning substring ', authorization.substring(7))
//         return authorization.substring(7);
//     }
//     return null;
// }

blogsRouter.post('/', async (request, response, next) => {
    try {

        // method using getTokenFrom() method, NO MIDDLEWARE
        // const token = getTokenFrom(request);

        //method using MIDDLEWARE to create request.token header
        const token = request.token !== undefined ? request.token : null;

        // const decodedToken = token === null ? false : jwt.verify(token, process.env.SECRET);
        const user = request.user;
        if (!(token && user.id)) {
            return response.status(401).json({ error: 'invalid or expired token' });
        }
        const userFetch = await User.findById(user.id);

        if (request.body.author === '') request.body.author = undefined;
        const blogToAdd = new Blog({
            name: request.body.name,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id
        });

        const savedBlog = await blogToAdd.save();
        userFetch.blogs = userFetch.blogs.concat(savedBlog._id);
        await userFetch.save();

        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception);
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const idToDel = request.params.id;
        const token = request.token;
        // const decodedToken = token === null || token === undefined ? false : jwt.verify(token, process.env.SECRET);
        // if (!(decodedToken)) return response.status(401).json({error: 'invalid or missing webtoken'});
        // const userIdFromToken = decodedToken.id;

        const user = request.user;
        const userFetch = await User.findById(user.id);
        const blogFetch = await Blog.findById(idToDel);
        if (!blogFetch) return response.status(400).json({ error: 'invalid request' });
        if (blogFetch ? userFetch.id.toString() === blogFetch.user.toString() : false) {
            const deletedBlog = await Blog.findByIdAndDelete(idToDel);
            deletedBlog ? response.status(204).end() : response.status(400).json({ error: 'failed to perform delete' });
        } else {
            return response.status(401).json({ error: 'bad request. insufficient credentials for specified action' });
        }

        response.status(400).end();
    } catch (exception) {
        next(exception);
    }

    // OLD METHOD W/O WEBTOKEN AUTH
    // try {
    //     const idToDel = request.params.id;

    //     const deletedBlog = await Blog.findByIdAndDelete(idToDel);
    //     logger.info('info passed ', deletedBlog);
    //     // deletedBlog ? response.status(200).json(deletedBlog) : response.status(400).end();
    //     deletedBlog ? response.status(204).end() : response.status(400).end();
    //     // response.status(204).end();
    // } catch (exception) {
    //     next(exception);
    // }
})

// updates blog doc -- specifically likes
blogsRouter.put('/:id', async (request, response, next) => {

    // console.log('logging ', updatedBlog)

    try {
        const updatedBlog = {
            ...request.body, likes: request.body.likes
        }
        const blogToPut = new Blog(updatedBlog);
        // const queryResponse = await Blog.findByIdAndUpdate(updatedBlog.id, updatedBlog, { new: true });
        console.log('Trying to find blog', blogToPut);
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