'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('applicationWorkflow', 'groupId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'group',
        key: 'id'
      }
    });
    await queryInterface.addIndex('applicationWorkflow', ['groupId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationWorkflow', 'groupId');
  }
};
