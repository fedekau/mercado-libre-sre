const express = require('express');
const items = require('./routes/items');
const health = require('./routes/health');

const Router = express.Router();

Router.use('/health', health);
Router.use('/items', items);


module.exports = Router;
