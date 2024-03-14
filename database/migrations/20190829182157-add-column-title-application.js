'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('application', 'subject', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('applicationExecution', 'title', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('application', 'subject');
    await queryInterface.removeColumn('applicationExecution', 'title');
  }
};
