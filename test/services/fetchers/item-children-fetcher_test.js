const ItemChildrenFetcher = require('../../../app/services/fetchers/item-children-fetcher');

describe('ItemChildrenFetcher', () => {
  describe('#fetch', () => {
    before(() => {
      mockRequest({
        path: '/items/MLA123456/children',
        response: [{
            "id": "MLA123456",
            "title": "Some random item",
            "category_id": "MLU0000",
            "price": 1234
          }]
      });
    });

    it('it should fetch the children from the api', async () => {
      const itemChildren = await ItemChildrenFetcher.fetch('MLA123456');

      expect(itemChildren).to.deep.equal([
        {
          "id": "MLA123456",
          "title": "Some random item",
          "category_id": "MLU0000",
          "price": 1234
        }
      ]);
    });
  });
});
