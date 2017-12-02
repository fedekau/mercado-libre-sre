const redis = require("redis-mock");
const ItemsCache = require('../../app/services/items-cache');

describe('ItemsCache', () => {
  before(() => {
    this.client = redis.createClient();

    this.client.set('MLU123', JSON.stringify({ item_id: 'MLU123' }));

    this.cache = cache = new ItemsCache(this.client);
  });

  describe('#exists', () => {
    it('it returns true if the item is cached', async () => {
      expect(await this.cache.exists('MLU123')).to.be.true;
    });

    it('it returns false if the item is not cached', async () => {
      expect(await this.cache.exists('MLU124')).to.be.false;
    });
  });

  describe('#get', () => {
    it('it returns the item if the item is cached', async () => {
      expect(await this.cache.get('MLU123')).to.deep.equal({ item_id: 'MLU123' });
    });

    it('it returns null if the item is not cached', async () => {
      expect(await this.cache.get('MLU124')).to.be.null;
    });
  });

  describe('#set', () => {
    it('it sets the item in the cache', async () => {
      await this.cache.set({ item_id: 'MLU1236' });

      expect(await this.cache.get('MLU1236')).to.deep.equal({ item_id: 'MLU1236' });
    });

    it('it overrides the item if key exists', async () => {
      await this.cache.set({ item_id: 'MLU1234' });
      await this.cache.set({ item_id: 'MLU1234', something: 'Not important' });

      expect(await this.cache.get('MLU1234')).to.deep.equal({ item_id: 'MLU1234', something: 'Not important' });
    });
  });
});
