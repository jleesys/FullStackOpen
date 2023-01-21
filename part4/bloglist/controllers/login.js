const middleware = require('../utils/middleware');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response, next) => {
    try {
        const { username, password } = request.body;
        const userFetch = await User.findOne({ username });
        const passwordMatch = userFetch === null ? false : await bcrypt.compare(password, userFetch.passwordHash);
        if (!(userFetch && passwordMatch)) {
            return response.status(401).json({ error: 'incorrect username/password' });
        }
        // issue token with successful login
        const userForToken = {
            username: userFetch.username,
            id: userFetch._id
        };
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

        response
            .status(200)
            .send({ token, username: userFetch.username, name: userFetch.name })
            console.log(userFetch.username, userFetch.name);
    } catch(exception) {
        next(exception);
    }
})

module.exports = loginRouter;