const express = require('express');
const Router = express.Router();
const ItemGateway = require('../services/item-gateway');

Router.get('/:id', async (request, response) => {
  var id = request.params.id;

  const item = await ItemGateway.get(id);

  response.json(item);
});

module.exports = Router;
