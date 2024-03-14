'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    `DO
      $do$
      BEGIN

      IF NOT EXISTS (SELECT 1 FROM "user" where "email" = 'talha@aetasaal.com') THEN
         INSERT INTO "user" (id, "firstName", "lastName", "email", "password", "isEmailVerified", "contactNo", "status", "isActive", "isApproved") 
         VALUES (Default,'Talha', 'Aetasaal', 'talha@aetasaal.com', '506708e04613ade50f6b7bd0b8f46311574d3ff9931e11aa53e5b277e309850779b930f96aaa2901ae61e2b876b34af317e6323e5e58c35bd3b966292bb388d7', true, '11111111', 'active', true, true);
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM "userRole" where "userId" = (SELECT id FROM "user" where "email" = 'talha@aetasaal.com' limit 1)) THEN
        INSERT INTO "userRole" (id, "userId", "roleId") 
        VALUES (Default, (select id from "user" where "email" = 'talha@aetasaal.com' limit 1), (select id from "role" where "name" = 'superAdmin' limit 1));
      END IF;
  
      END
      $do$`
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
