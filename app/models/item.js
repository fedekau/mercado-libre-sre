const { Children } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    item_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: DataTypes.STRING,
    category_id:  DataTypes.STRING,
    price: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    stop_time: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    underscored : true,
    tableName: 'items'
  });

  Item.associate = (models) => {
    Item.hasMany(models.Children, {
      foreignKey: 'parent_item_id'
    });
  }

  return Item;
};
