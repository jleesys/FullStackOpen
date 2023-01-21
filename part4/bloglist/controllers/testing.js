const testingRouter = require('express').Router();
const Blog = require('../models/blogmodel');
const User = require('../models/user');

testingRouter.post('/reset', async (request, response, next) => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    response.status(204).end();
});

module.exports = testingRouter;
