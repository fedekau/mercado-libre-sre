const ItemFetcher = require('./fetchers/item-fetcher');
const ItemChildrenFetcher = require('./fetchers/item-children-fetcher');
const ItemsCache = require('./items-cache');

class ItemGateway {
  static async get(item_id) {
    const itemsCache = new ItemsCache();

    if (await itemsCache.exists(item_id)) {
      return await itemsCache.get(item_id);
    }

    const [item, children] = await Promise.all([
      ItemFetcher.fetch(item_id),
      ItemChildrenFetcher.fetch(item_id),
    ]);

    const composedItem = {
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

    itemsCache.set(composedItem);

    return composedItem;
  }
}

module.exports = ItemGateway;
