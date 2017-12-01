const express = require('express');
const items = require('./routes/items');

const Router = express.Router();

Router.use('/items', items);

module.exports = Router;
