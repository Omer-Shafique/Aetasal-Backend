import * as Router from 'koa-router';

import * as ctrl from '../controller/lookup';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/lookup`,
});

router.use(authentication);

router.get('/', ctrl.getAll);

router.get('/:lookupId/data', ctrl.findByLookupId);

router.get('/lookup-data/:lookupDataId', ctrl.findLookupDataById);

router.post('/', authorization(false, [Role.SUPER_ADMIN]), ctrl.saveLookup);

router.post('/:lookupId/data', authorization(false, [Role.SUPER_ADMIN]), ctrl.saveLookupData);

router.delete('/:id', authorization(false, [Role.SUPER_ADMIN]), ctrl.deleteLookup);

router.delete('/:lookupId/data/:id', authorization(false, [Role.SUPER_ADMIN]), ctrl.deleteLookupData);

export default router.routes();
