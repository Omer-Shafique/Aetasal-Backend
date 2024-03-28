import * as Router from 'koa-router';

import * as ctrl from '../controller/auth';
import * as userCtrl from '../controller/user';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/user`,
});

// router.use(authentication);

// router.get('/', authorization(false, [Role.SUPER_ADMIN, Role.USER]), userCtrl.getAll);
router.get('/', authorization(), userCtrl.getAll);

router.get('/me', userCtrl.getUser);

router.get('/:userId', authorization(), userCtrl.getUserById);
// router.get('/:userId', authorization(false, [Role.SUPER_ADMIN, Role.USER]), userCtrl.getUserById);

router.get('/department/:departmentId',
authorization(), userCtrl.getUserByDepartmentId);
// authorization(false, [Role.SUPER_ADMIN, Role.USER]), userCtrl.getUserByDepartmentId);

router.post('/', authorization(), userCtrl.saveUser);
// router.post('/', authorization(false, [Role.SUPER_ADMIN, Role.USER]), userCtrl.saveUser);

router.put('/change-password', ctrl.changePassword);

router.delete('/:userId/delete', authorization(), userCtrl.deleteUser);
// router.delete('/:userId/delete', authorization(false, [Role.SUPER_ADMIN, Role.USER]), userCtrl.deleteUser);

export default router.routes();


