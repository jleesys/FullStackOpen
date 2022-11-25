const { PORT, MONGODB_URI } = require('./utils/config');
const http = require('http');
const logger = require('./utils/logger');
const app = require('./app');

app.listen(PORT, (err) => {
    if (!err) logger.info('Connnected to server');
    else logger.error('Failed to connect to port ', PORT);
})
console.log('lol');

