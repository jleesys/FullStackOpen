// holds configs for server, PORT & MONGO URI
const dotenv = require('dotenv').config();

const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports =  { PORT, MONGODB_URI };
