const logger = require('../utils/logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.boy);
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

module.exports = {
    requestLogger,
    errorLogger
}