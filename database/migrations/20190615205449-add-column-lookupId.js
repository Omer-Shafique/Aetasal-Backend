'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('applicationFormField', 'lookupId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'lookup',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('applicationFormField', 'lookupId');
  }
};
