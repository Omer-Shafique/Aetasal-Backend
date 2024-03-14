import * as Router from 'koa-router';

import * as ctrl from '../controller/ping';

const router = new Router({
  prefix: `/api`
});

router.get('/ping', ctrl.ping);

router.get('/generate-password', ctrl.generatePassword);

export default router.routes();
