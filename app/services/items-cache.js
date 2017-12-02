const redis = require('redis');
const redisClient = redis.createClient();

class ItemsCache {
  constructor(client = redisClient) {
    this.client = client;
  }

  exists(item_id) {
    return new Promise((resolve, reject) => {
      this.client.exists(item_id, (error, value) => {
        resolve(value === 1);
      });
    });
  }

  get(item_id) {
    return new Promise((resolve, reject) => {
      this.client.get(item_id, (error, value) => {
        resolve(JSON.parse(value));
      });
    });
  }

  set(item) {
    const id = item.item_id;

    return new Promise((resolve, reject) => {
      this.client.set(id, JSON.stringify(item), (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(item);
        }
      });
    });

  }
}

module.exports = ItemsCache;
