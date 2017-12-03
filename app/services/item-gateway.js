const ItemFetcher = require('./fetchers/item-fetcher');
const ItemChildrenFetcher = require('./fetchers/item-children-fetcher');
const { Item, Children } = require('../models/index');

class ItemGateway {
  static async get(item_id) {
    const [item, children] = await Promise.all([
      ItemFetcher.fetch(item_id),
      ItemChildrenFetcher.fetch(item_id),
    ]);

    return Item.create({
      item_id: item.id,
      title: item.title,
      category_id: item.category_id,
      price: item.price,
      start_time: item.start_time,
      stop_time: item.stop_time
    }).then((model) => {
      return Promise.all([ Promise.resolve(model), Children.bulkCreate(children.map((c) => {
        return {
          item_id: c.id,
          parent_item_id: model.item_id,
          stop_time: c.stop_time
        };
      }))]);
    }).then((models) => {
      const [ item, children ] = models;

      return item.setChildren(children).then((model) => {
        return model;
      });;
    });
  }
}

module.exports = ItemGateway;
