'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Perform migration tasks here, such as creating or modifying tables
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define other columns here
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    // Perform reverse migration tasks here, such as dropping tables
    return queryInterface.dropTable('Users');
  }
};
