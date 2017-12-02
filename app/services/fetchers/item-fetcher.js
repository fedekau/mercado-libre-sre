const rp = require('request-promise-native');

class ItemFetcher {
  static async fetch(item_id) {
    const response = await rp.get(`https://api.mercadolibre.com/items/${item_id}`);
    return JSON.parse(response);
  }
}

module.exports = ItemFetcher;
