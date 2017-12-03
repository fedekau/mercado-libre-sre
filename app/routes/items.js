const express = require('express');
const Router = express.Router();
const ItemFinder = require('../services/item-finder');
const errors = require('request-promise-native/errors');

Router.get('/:id', async (request, response) => {
  var item_id = request.params.id;

  try {
    const item = await ItemFinder.find(item_id);
    console.log(item);

    response.json(item);
  } catch(e) {
    if (e instanceof errors.StatusCodeError) {
      response.
        status(e.response.statusCode).
        json(JSON.parse(e.response.body));
    } else {
      response.
        status(500).
        json({
          message: "Unexpected error",
          status: 500,
          error: "internal_server_error",
          cause: [ e.cause ]
        });
    }
  }
});

module.exports = Router;
