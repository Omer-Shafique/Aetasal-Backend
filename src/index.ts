import config from './config/index'; 
import { startServer } from './server'; 
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
