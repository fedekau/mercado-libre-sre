const rp = require('request-promise-native');

class ItemChildrenFetcher {
  static async fetch(item_id) {
    const response = await rp.get(`https://api.mercadolibre.com/items/${item_id}/children`);
    return JSON.parse(response);
  }
}

module.exports = ItemChildrenFetcher;
