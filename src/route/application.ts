import * as Router from 'koa-router';

import * as ctrl from '../controller/application';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/application`,
});

router.use(authentication);

router.get('/', ctrl.getCurrentLoggedInUserApplications);

router.get('/:applicationId', ctrl.getApplicationById);

router.put('/:applicationId/publish',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.publishApplication);

router.get('/:applicationId/section/:sectionId',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.getApplicationFormSectionById);

router.get('/:applicationId/field/:fieldId',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.getApplicationFormFieldById);

router.get('/:applicationId/form', ctrl.getApplicationForm);

router.get('/:applicationId/workflow',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.getApplicationWorkflow);

router.get('/:applicationId/field-permission',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.getApplicationWorkflowFieldPermission);

router.get('/:applicationId/form-field-titles', ctrl.getApplicationFieldTitles);

router.post('/', authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.saveApplication);

router.post('/:applicationId/form',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.saveApplicationForm);

router.post('/:applicationId/workflow',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.saveApplicationWorkflow);

router.post('/:applicationId/field-permission',
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR]), ctrl.saveApplicationWorkflowFieldPermission);

router.delete('/:id', ctrl.deleteApplication);

export default router.routes();
