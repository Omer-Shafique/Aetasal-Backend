'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationFormField', 'isRequired');
    await queryInterface.addColumn('applicationFormField', 'icon', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('applicationFormField', 'templateName', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('applicationFormField', 'isRequired', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
    await queryInterface.removeColumn('applicationFormField', 'icon');
    await queryInterface.removeColumn('applicationFormField', 'templateName');
  }
};
