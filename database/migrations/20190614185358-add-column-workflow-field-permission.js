'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('applicationWorkflowFormPermission', 'applicationWorkflowFieldPermission');
    await Promise.all([
      queryInterface.addColumn('applicationWorkflowFieldPermission', 'applicationId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'application',
          key: 'id'
        }
      }),
      queryInterface.addColumn('applicationWorkflowFieldPermission', 'type', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('applicationWorkflowFieldPermission', 'conditions', {
        type: Sequelize.JSONB,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('applicationWorkflowFieldPermission', 'applicationWorkflowFormPermission');
    await queryInterface.removeColumn('applicationWorkflowFieldPermission', 'applicationId');
    await queryInterface.removeColumn('applicationWorkflowFieldPermission', 'type');
    await queryInterface.removeColumn('applicationWorkflowFieldPermission', 'conditions');
  }
};
