'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('applicationWorkflow', 'stepId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'applicationWorkflow',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationWorkflow', 'stepId');
  }
};
