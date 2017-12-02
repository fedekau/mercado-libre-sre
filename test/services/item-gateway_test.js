const ItemGateway = require('../../app/services/item-gateway');

describe('ItemGateway', () => {
  describe('#fetch', () => {
    before(() => {
      mockRequest({
        path: '/items/MLA123456',
        response: {
          id: "MLA123456",
          title: "Some random item",
          category_id: "MLU0000",
          price: 1234,
          start_time: "2017-04-18T14:50:35.000Z",
          stop_time: "2037-04-13T14:59:14.000Z",
          random_field: 'Not important'
        }
      });

      mockRequest({
        path: '/items/MLA123456/children',
        response: [
          {
            id: "MLA12343",
            stop_time: "2017-04-13T14:59:14.000Z",
            random_field: "Not important"
          },
          {
            id: "MLA12344",
            stop_time: "2017-07-13T14:59:14.000Z",
            random_field: "Not important"
          }
        ]
      });
    });

    it('it should compose an item with data from the api', async () => {
      const item = await ItemGateway.get('MLA123456');

      expect(item).to.deep.equal({
        item_id: "MLA123456",
        title: "Some random item",
        category_id: "MLU0000",
        price: 1234,
        start_time: "2017-04-18T14:50:35.000Z",
        stop_time: "2037-04-13T14:59:14.000Z",
        children: [
          {
            item_id: "MLA12343",
            stop_time: "2017-04-13T14:59:14.000Z",
          },
          {
            item_id: "MLA12344",
            stop_time: "2017-07-13T14:59:14.000Z",
          }
        ]
      });
    });
  });
});
