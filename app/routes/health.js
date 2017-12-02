const express = require('express');
const Router = express.Router();

Router.get('/', async (request, response) => {
  response.json({ status: "OK" });
});

module.exports = Router;
