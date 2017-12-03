const express = require('express');
const Router = express.Router();
const HealthChecker = require('../services/health-checker');

Router.get('/', async (request, response) => {
  const health = await HealthChecker.status();

  response.json(health);
});

module.exports = Router;
