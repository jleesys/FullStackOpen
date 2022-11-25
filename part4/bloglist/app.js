// cors 

const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogslists');
const cors = require('cors');
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

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
// app.use('/', (request, response, next) => {
//     response
//     .send(`<h1>Hello</h1><div>Temporary page.</div>`)
//     .catch(error => next(error));
// })

app.use(middleware.errorLogger);
app.use(middleware.unknownEndpoint);

module.exports = app;