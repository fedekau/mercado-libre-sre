const express = require('express');
const Router = express.Router();

Router.get('/:id', (request, response) => {
  var id = request.params.id;

  response.json({ id });
});

module.exports = Router;
