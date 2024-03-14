import { ApplicationExecutionStatus, ApplicationWorkflowPermissionType } from '../enum/application';

export const PERMISSION_STATUS_MAPPING = {
    [ApplicationExecutionStatus.DRAFT]: ApplicationWorkflowPermissionType.NEW,
};
