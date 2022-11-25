/* eslint-disable no-unused-vars */
const { PORT, MONGODB_URI } = require('./utils/config');
const http = require('http');
const logger = require('./utils/logger');
const app = require('./app');

const server = http.createServer(app);

app.listen(PORT, (err) => {
    if (!err) {
        logger.info(`Connnected to server on port ${PORT}`);
    } else {
        logger.error('Failed to connect to port ', PORT);
    }
})