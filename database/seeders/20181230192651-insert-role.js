'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `DO
      $do$
      BEGIN

      IF NOT EXISTS (SELECT 1 FROM role where name = 'superAdmin') THEN
         INSERT INTO role VALUES (Default,'superAdmin');
      END IF;

      IF NOT EXISTS (SELECT 1 FROM role where name = 'user') THEN
        INSERT INTO role VALUES (Default,'user');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM role where name = 'billing') THEN
        INSERT INTO role VALUES (Default,'billing');
      END IF;

      IF NOT EXISTS (SELECT 1 FROM role where name = 'appCreator') THEN
        INSERT INTO role VALUES (Default,'appCreator');
      END IF;
      
      END
      $do$`
    );
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
