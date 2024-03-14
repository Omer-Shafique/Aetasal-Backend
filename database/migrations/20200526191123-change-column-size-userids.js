'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table application alter column "userIds" type character varying(1000);
    `);
  },

  down: () => {
    // no down
  }
};
