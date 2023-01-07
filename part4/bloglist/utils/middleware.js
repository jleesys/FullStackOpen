const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.body);
    logger.info('-----');
    next();
}

const errorLogger = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        logger.error('ValidationError');
        response.status(400).send({ error: "Validation Error" });
    } else if (error.name === 'CastError') {
        logger.error('CastError');
        response.status(400).send({ error: "Cast error" });
    }
    next(error);
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "I don't know what you were trying to get to, but it ain't here." });
}

const tokenExtractor = (request, response, next) => {
    // console.log('entered tokenExtractor middleware...')
    const authorization = request.get('authorization');
    // if (!authorization) next();
    // if (!(authorization && authorization.toLowerCase().startsWith('Bearer '))) {
    //     next();
    // }
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    // console.log(request.token);
    next();
}

const userExtractor = (request, response, next) => {
    const token = request.token;
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        request.user = decodedToken;
    }
    // contains username and user (object) id
    next();
}

module.exports = {
    requestLogger,
    errorLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}