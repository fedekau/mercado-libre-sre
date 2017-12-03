const rp = require('request-promise-native');
const Fetcher = require('./fetcher');

class ItemChildrenFetcher extends Fetcher {
  static async fetch(item_id) {
    return super.fetch(`https://api.mercadolibre.com/items/${item_id}/children`);
  }
}

module.exports = ItemChildrenFetcher;
