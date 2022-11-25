// cors 

const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/bloglists');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

mongoose
    .connect(config.MONGODB_URI)
    .then(response => {
        logger.info('Connected to DB Successfully!');
    })
    .catch(error => {
        logger.error('Failed to connected to MongoDB: ', error);
    })

app.use(middleware.requestLogger);
app.use('/', blogsRouter);

app.use(middleware.errorLogger);

module.exports = app;