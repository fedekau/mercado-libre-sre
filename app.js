const dotenv = require('dotenv');

dotenv.config();

const application = require('./app/index');
const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(morgan('tiny'));
server.use(application);

server.listen(3000);

module.exports = server;
