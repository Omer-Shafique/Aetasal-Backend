'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('applicationExecutionWorkflow', 'userPermissionId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    });
    await queryInterface.addIndex('applicationExecutionWorkflow', ['userPermissionId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationExecutionWorkflow', 'userPermissionId');
  }
};
