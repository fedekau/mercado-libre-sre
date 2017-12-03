const ItemGateway = require('../services/item-gateway');
const { Item } = require('../models/index');

class ItemFinder {
  static async find(item_id) {
    let item = await Item.findById(item_id);

    if(!item) {
      item = await ItemGateway.get(item_id);
    }

    return item;
  }
}

module.exports = ItemFinder;
