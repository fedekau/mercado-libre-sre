const express = require('express');
const Router = express.Router();
const HealthChecker = require('../services/health-checker');

Router.get('/', async (request, response) => {
  response.json(await HealthChecker.status());
});

module.exports = Router;
