const ItemFetcher = require('./fetchers/item-fetcher');
const ItemChildrenFetcher = require('./fetchers/item-children-fetcher');

class ItemGateway {
  static async get(item_id) {
    const [item, children] = await Promise.all([
      ItemFetcher.fetch(item_id),
      ItemChildrenFetcher.fetch(item_id),
    ]);

    return {
      item_id: item.id,
      title: item.title,
      category_id: item.category_id,
      price: item.price,
      start_time: item.start_time,
      stop_time: item.stop_time,
      children: children.map((c) => {
        return { item_id: c.id, stop_time: c.stop_time };
      })
    }
  }
}

module.exports = ItemGateway;
