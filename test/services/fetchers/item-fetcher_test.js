const ItemFetcher = require('../../../app/services/fetchers/item-fetcher');

describe('ItemFetcher', () => {
  describe('#fetch', () => {
    before(() => {
      mockRequest({
        path: '/items/MLA123456',
        response: {
          "id": "MLA123456",
          "title": "Some random item",
          "category_id": "MLU0000",
          "price": 1234
        }
      });
    });

    it('it should fetch the item from the api', async () => {
      const item = await ItemFetcher.fetch('MLA123456');

      expect(item).to.deep.equal({
        "id": "MLA123456",
        "title": "Some random item",
        "category_id": "MLU0000",
        "price": 1234
      });
    });
  });
});
