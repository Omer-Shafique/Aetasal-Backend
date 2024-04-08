import * as Router from 'koa-router';

import * as ctrl from '../controller/group';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/group`,
});

router.use(authentication);

// router.get('/', authorization(), ctrl.getAll);
router.get('/', authorization(false, [Role.SUPER_ADMIN , Role.APP_CREATOR]), ctrl.getAll);

// router.post('/', authorization(), ctrl.saveGroup);
router.post('/', authorization(false, [Role.SUPER_ADMIN  ]), ctrl.saveGroup);

// router.delete('/:id', authorization(), ctrl.deleteGroup);
router.delete('/:id', authorization(false, [Role.SUPER_ADMIN  ]), ctrl.deleteGroup);

export default router.routes();
