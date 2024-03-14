'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: true,
    });
    await queryInterface.addColumn('user', 'deletedBy', {
      type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'deletedAt');
    await queryInterface.removeColumn('user', 'deletedBy');
  }
};
