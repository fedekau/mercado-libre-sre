module.exports = (sequelize, DataTypes) => {
  var Children = sequelize.define('Children', {
    item_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    stop_time: DataTypes.DATE
  }, {
    underscored : true,
    tableName: 'children'
  });

  Children.associate = (models) => {
    Children.belongsTo(models.Item, {
      foreignKey: 'parent_item_id',
      onDelete: 'CASCADE',
    });
  }

  Children.prototype.toJSON = function () {
    const values = this.get();

    delete values['created_at'];
    delete values['updated_at'];

    return values;
  }
  return Children;
};
