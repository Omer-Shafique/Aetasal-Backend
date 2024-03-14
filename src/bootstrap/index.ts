import * as Bunyan from 'bunyan';

import { Database } from './database';

async function bootstrap(log: Bunyan) {
  try {
    await Database.authenticate();
    log.info('database connected');
  } catch (err) {
    await Database.close();
    throw err;
  }
}

export default bootstrap;
