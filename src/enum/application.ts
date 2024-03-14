export enum ApplicationExecutionStatus {
    DRAFT = 'draft',
    CLARITY = 'clarity',
    REJECT = 'reject',
    APPROVED = 'approved',
    IN_PROGRESS = 'inProgress',
    WITHDRAW = 'withdraw'
}

export enum ApplicationWorkflowType {
    APPROVAL = 'approval',
    INPUT = 'input'
}

export enum ApplicationWorkflowFieldPermission {
    VISIBLE = 'visible',
    EDITABLE = 'editable',
    READONLY = 'readonly',
    HIDDEN = 'hidden',
    CONDITIONAL = 'conditional'
}

export enum ApplicationWorkflowPermissionType {
    NEW = 'new',
    INITIATOR_SUMMARY = 'initiator_summary',
    ALL_TASK = 'all_task',
    WORKFLOW = 'workflow'
}

export enum ApplicationWorkflowAssignTo {
    INITIATOR = 'initiator',
    MANAGER = 'manager',
    DEPARTMENT_HEAD = 'department_head',
    LOCATION_HEAD = 'location_head',
    FIELD = 'field',
    GROUP = 'group'
}
