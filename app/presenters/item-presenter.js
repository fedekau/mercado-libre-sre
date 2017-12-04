class ItemPresenter {
  constructor(item) {
    this.item = item;
  }

  async toJSON() {
    const json = this.item.toJSON();

    delete json['created_at'];
    delete json['updated_at'];

    const children = await this.item.getChildren();

    json.children = children.map((c) => {
      return {
        item_id: c.item_id,
        stop_time: c.stop_time
      }
    });

    return json;
  }
}

module.exports = ItemPresenter;
