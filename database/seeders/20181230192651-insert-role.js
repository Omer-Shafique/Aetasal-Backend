'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Starting database seeding...');

    try {
      await queryInterface.sequelize.query(`
        DO
        $do$
        BEGIN

        IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'superAdmin') THEN
           INSERT INTO role VALUES (DEFAULT, 'superAdmin');
           -- Use DEFAULT instead of Default for auto-incrementing primary keys
        END IF;

        IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'user') THEN
          INSERT INTO role VALUES (DEFAULT, 'user');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'billing') THEN
          INSERT INTO role VALUES (DEFAULT, 'billing');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'appCreator') THEN
          INSERT INTO role VALUES (DEFAULT, 'appCreator');
        END IF;
        
        END
        $do$
      `);

      console.log('Database seeding completed successfully.');
    } catch (error) {
      console.error('Error while seeding database:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // No need to implement the down method for seeding
  }
};
