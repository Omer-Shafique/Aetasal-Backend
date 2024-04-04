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
// authorization(), ctrl.publishApplication);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER ]), ctrl.publishApplication);

router.get('/:applicationId/section/:sectionId',
// authorization(), ctrl.getApplicationFormSectionById);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER ]), ctrl.getApplicationFormSectionById);

router.get('/:applicationId/field/:fieldId',
// authorization(), ctrl.getApplicationFormFieldById);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER ]), ctrl.getApplicationFormFieldById);

router.get('/:applicationId/form', ctrl.getApplicationForm);

router.get('/:applicationId/workflow',
// authorization(), ctrl.getApplicationWorkflow);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.getApplicationWorkflow);

router.get('/:applicationId/field-permission',
// authorization(), ctrl.getApplicationWorkflowFieldPermission);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.getApplicationWorkflowFieldPermission);

router.get('/:applicationId/form-field-titles', ctrl.getApplicationFieldTitles);

// router.post('/', authorization(), ctrl.saveApplication);
router.post('/', authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.saveApplication);

router.post('/:applicationId/form',
// authorization(), ctrl.saveApplicationForm);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.saveApplicationForm);

router.post('/:applicationId/workflow',
// authorization(), ctrl.saveApplicationWorkflow);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.saveApplicationWorkflow);

router.post('/:applicationId/field-permission',
// authorization(), ctrl.saveApplicationWorkflowFieldPermission);
authorization(false, [Role.SUPER_ADMIN, Role.APP_CREATOR , Role.USER]), ctrl.saveApplicationWorkflowFieldPermission);

router.delete('/:id', ctrl.deleteApplication);

export default router.routes();
