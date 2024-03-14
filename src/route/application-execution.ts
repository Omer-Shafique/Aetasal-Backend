import * as Router from 'koa-router';

import * as ctrl from '../controller/application';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/application-execution`,
});

router.use(authentication);

router.get('/all', authorization(false, [Role.SUPER_ADMIN]), ctrl.getAllExecution);

router.get('/:applicationId/execution', ctrl.getApplicationExecution);

// for approvals, input request
router.get('/workflow', ctrl.getExecutionByLoggedInUserId);

// for draft, reject, clarity
router.get('/workflow/action', ctrl.getExecutionInProcessLoggedInUserId);

router.get('/workflow/action/query', ctrl.getExecutionInProcessLoggedInUserIdByQuery);

router.get('/workflow/action/count', ctrl.getExecutionWorkflowsCount);

router.get('/:executionId/detail', ctrl.getExecutionById);

router.get('/:executionId/transformed', ctrl.getDetailExecutionById);

router.get('/participated', ctrl.getExecutionParticipatedLoggedInUserId);

router.get('/participated/query', ctrl.getExecutionParticipatedQuery);

router.get('/:applicationId/in-progress', ctrl.getInProgressExecutions);

router.get('/withdraw', ctrl.getWithdrawExecutions);

router.get('/:executionId/users', ctrl.getExecutionParticipatedUsers);

router.post('/:applicationId/execution', ctrl.saveApplicationExecution);

router.put('/:applicationId/execution/form', ctrl.saveApplicationExecutionForm);

router.put('/:applicationId/execution/:applicationExecutionId/publish', ctrl.publishApplicationExecution);

// tslint:disable-next-line:max-line-length
router.put('/:applicationId/execution/:applicationExecutionId/workflow/:applicationExecutionWorkflowId', ctrl.saveApplicationExecutionWorkflow);

router.put('/:executionId/reassign', ctrl.reassignWorkflow);

router.put('/:executionId/withdraw/:executionWorkflowId', ctrl.withdraw);

router.delete('/execution/:executionId', ctrl.deleteApplicationExecution);

router.post('/:applicationId', authorization(false, [Role.SUPER_ADMIN]),
  ctrl.deleteApplicationExecutionByApplication);

export default router.routes();
