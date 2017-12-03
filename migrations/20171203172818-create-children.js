'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('children', {
      item_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      parent_item_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'items',
          key   : "item_id",
        }
      },
      stop_time: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('children');
  }
};
