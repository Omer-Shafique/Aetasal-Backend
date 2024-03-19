require('ts-node/register');

const config = require('../src/config/index.ts').default;

module.exports = {
    development: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        dialect: 'postgres',
        dialectOptions: {
            ssl: false
        },
        // Set alter or force option to true for automatic table creation or synchronization
        // Use alter if you want to modify existing tables without dropping them
        // Use force if you want to drop existing tables and re-create them
        // Make sure to use these options with caution in production
        // alter: true, // Uncomment this line if you want to use alter
        force: true, // Uncomment this line if you want to use force

        operatorsAliases: false,
        // logging: console.log
    },

}



//     live_old: {
//         host: 'ec2-54-235-208-103.compute-1.amazonaws.com',
//         port: 5432,
//         username: 'hmszolrlciatrx',
//         password: '7992419508a7ff36765bf7addc0e07fdb11b90b85b68372f024bfd9fa87b5a61',
//         database: 'dfps9d3tkcn7ua',
//         dialect: 'postgres',
//         dialectOptions: {
//             ssl: true
//         },
//         operatorsAliases: false
//     },
//     live: {
//         host: '185.67.0.30',
//         port: 5432,
//         username: 'postgres',
//         password: 'PpWXdf7aTC97nz6h',
//         database: 'aetasaal',
//         dialect: 'postgres',
//         dialectOptions: {
//             ssl: false
//         },
//         operatorsAliases: false
//     }
// };