import * as Router from 'koa-router';

import * as ctrl from '../controller/user-location-trail';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/user-location-trail`,
});

router.use(authentication);

router.get('/', authorization(false, [Role.SUPER_ADMIN]), ctrl.getAll);

router.post('/', ctrl.saveUserLocationTrail);

export default router.routes();
