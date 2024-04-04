import * as Router from 'koa-router';

import authentication from '../middleware/authentication';
import * as ctrl from '../controller/file';

const router = new Router({
  prefix: `/api/file`,
});

router.use(authentication);

router.post('/picture', ctrl.saveProfilePicture);

router.post('/execution', ctrl.saveExecutionFile);

export default router.routes();
