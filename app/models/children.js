module.exports = (sequelize, DataTypes) => {
  var Children = sequelize.define('Children', {
    item_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    stop_time: DataTypes.DATE
  }, {
    underscored : true,
    tableName: 'children',
    classMethods: {
      associate: function(models) {
        Children.belongsTo(models.Item, {
          foreignKey: 'parent_item_id',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Children;
};
