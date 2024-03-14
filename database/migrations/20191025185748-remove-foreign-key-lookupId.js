'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('applicationFormField', 'applicationFormField_lookupId_fkey');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('applicationFormField', ['lookupId'], {
      type: 'FOREIGN KEY',
      name: 'applicationFormField_lookupId_fkey', // useful if using queryInterface.removeConstraint
      references: {
        table: 'lookup',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  }
};
