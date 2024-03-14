'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const updatedAtColumn = {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    };
    await Promise.all([
      queryInterface.removeColumn('user', 'updatedAt'),
      queryInterface.removeColumn('application', 'updatedAt'),
      queryInterface.removeColumn('applicationFormSection', 'updatedAt'),
      queryInterface.removeColumn('applicationFormField', 'updatedAt'),
      queryInterface.removeColumn('applicationWorkflow', 'updatedAt'),
      queryInterface.removeColumn('applicationExecution', 'updatedAt'),
      queryInterface.removeColumn('applicationExecutionForm', 'updatedAt'),
      queryInterface.removeColumn('applicationExecutionWorkflow', 'updatedAt')
    ]);
    await Promise.all([
      queryInterface.addColumn('user', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('application', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationFormSection', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationFormField', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationWorkflow', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationExecution', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationExecutionForm', 'updatedAt', updatedAtColumn),
      queryInterface.addColumn('applicationExecutionWorkflow', 'updatedAt', updatedAtColumn),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.resolve();
  }
};
