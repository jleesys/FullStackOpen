// cors 

const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogslists');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to DB Successfully!');
    })
    .catch(error => {
        logger.error('Failed to connected to MongoDB: ', error);
    })

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter);
}
// app.use('/', (request, response, next) => {
//     response
//     .send(`<h1>Hello</h1><div>Temporary page.</div>`)
//     .catch(error => next(error));
// })

app.use(middleware.errorLogger);
app.use(middleware.unknownEndpoint);

module.exports = app;