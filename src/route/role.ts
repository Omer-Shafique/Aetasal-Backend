import * as Router from 'koa-router';

import * as ctrl from '../controller/role';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/role`,
});

router.use(authentication);

router.get('/', ctrl.getAll);

router.post('/', authorization(false, [Role.SUPER_ADMIN]), ctrl.saveRole);

router.delete('/:id', authorization(false, [Role.SUPER_ADMIN]), ctrl.deleteRole);

export default router.routes();
