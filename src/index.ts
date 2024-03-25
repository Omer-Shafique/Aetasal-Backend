// import config from './config/index';
// import bootstrap from './bootstrap/index';
// import { startServer } from './server';
// import { Logger } from './utils/logger';
// import { loadTemplates } from './template/index';

// const log = new Logger('aetasaal-api').createLogger({ env: config.env });

// start();

// async function start() {
//   try {
//     await bootstrap(log);
//     await startServer(log);
//     await loadTemplates();
//   } catch (err) {
//     log.error(err.message, 'error while application setup');
//   }
// }



import config from './config/index'; // Import the config variable
import { startServer } from './server'; // Change this line
import { loadTemplates } from './template/index';
import { Logger } from './utils/logger';
import bootstrap from './bootstrap/index';

const log = new Logger('aetasaal-api').createLogger({ env: config.env });

start();

async function start() {
  try {
    await bootstrap(log);
    await startServer(log);
    await loadTemplates();
  } catch (err) {
    log.error(err.message, 'error while application setup');
  }
}