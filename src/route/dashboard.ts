import * as Router from 'koa-router';

import * as ctrl from '../controller/dashboard';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/dashboard`,
});

router.use(authentication);
router.use(authorization(false, [Role.SUPER_ADMIN]));

router.get('/admin/statistics', ctrl.getAdminDashboardStatistics);

export default router.routes();
