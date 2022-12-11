const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response, next) => {
    try {
        const usersInDb = await User.find({});
        // add populate for blog name
        response.json(usersInDb);
    } catch (exception) {
        next(exception);
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return response.status(400).json({ error: 'username already exists' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username, name, passwordHash
    })

    const savedUser = await user.save();

    response.status(201).json(savedUser);
})

module.exports = usersRouter;