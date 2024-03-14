import * as Router from 'koa-router';

import * as ctrl from '../controller/department';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/department`,
});

router.use(authentication);

router.get('/', ctrl.getAll);

router.post('/', ctrl.saveDepartment);

router.delete('/:id', ctrl.deleteDepartment);

export default router.routes();
