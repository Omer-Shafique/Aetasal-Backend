'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationExecutionWorkflow', 'comments');
    await queryInterface.addColumn('applicationExecutionWorkflow', 'comments', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.addColumn('applicationExecutionWorkflow', 'rejectionDetails', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.addColumn('applicationExecutionWorkflow', 'clarificationDetails', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationExecutionWorkflow', 'comments');
    await queryInterface.removeColumn('applicationExecutionWorkflow', 'rejectionDetails');
    await queryInterface.removeColumn('applicationExecutionWorkflow', 'clarificationDetails');
    await queryInterface.addColumn('applicationExecutionWorkflow', 'comments', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
