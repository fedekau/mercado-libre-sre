const ItemGateway = require('../../app/services/item-gateway');
const { Item, Children } = require('../../app/models/index');

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
      await Children.destroy({ where: {}});
      await Item.destroy({ where: {}});

      const item = await ItemGateway.get('MLA123456');
      const children = await item.getChildren();

      expect(item.item_id).to.equal("MLA123456");
      expect(item.title).to.equal("Some random item");
      expect(item.category_id).to.equal("MLU0000");
      expect(item.price).to.equal(1234);
      expect(item.start_time.toISOString()).to.equal("2017-04-18T14:50:35.000Z");
      expect(item.stop_time.toISOString()).to.equal("2037-04-13T14:59:14.000Z");
      expect(item).to.not.contain.key('random_field');
      expect(children.length).to.equal(2);

      expect(children[0].item_id).to.equal("MLA12343");
      expect(children[0].stop_time.toISOString()).to.equal("2017-04-13T14:59:14.000Z");
      expect(children[0]).to.not.contain.key('random_field');

      expect(children[1].item_id).to.equal("MLA12344");
      expect(children[1].stop_time.toISOString()).to.equal("2017-07-13T14:59:14.000Z");
      expect(children[1]).to.not.contain.key('random_field');
    });
  });
});
