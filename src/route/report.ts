import * as Router from 'koa-router';

import * as ctrl from '../controller/report';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/report`,
});

router.use(authentication);
router.use(authorization(false, [Role.SUPER_ADMIN]));

router.get('/my-item', ctrl.getMyItemReport);

router.get('/workload/:userId', ctrl.getUserWorkloadReport);

router.get('/application/:applicationId/time', ctrl.getApplicationExecutionTimeReport);

router.get('/application/:applicationId/metrics', ctrl.getTotalExecutionsCountReport);

router.get('/application/:applicationId/metrics/graph', ctrl.getTotalExecutionsCountGraph);

router.get('/application/:applicationId/location', ctrl.getApplicationExecutionLocationReport);

export default router.routes();
