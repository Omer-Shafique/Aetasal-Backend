import * as Router from 'koa-router';

import authentication from '../middleware/authentication';
import * as ctrl from '../controller/list-of-value';

const router = new Router({
  prefix: `/api/list-of-value`
});

router.use(authentication);

router.get('/', ctrl.findByKeys);

export default router.routes();
