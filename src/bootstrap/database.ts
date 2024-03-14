import * as Sequelize from 'sequelize';

import config from '../config/index';
import { Logger } from '../utils/logger';

const logger = new Logger().createLogger();

export const Database = new Sequelize({
    host: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.database,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false,
    },
    timezone: '+00:00',
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    },

    // See https://github.com/sequelize/sequelize/issues/8417
    operatorsAliases: false,
    logging: true
});
