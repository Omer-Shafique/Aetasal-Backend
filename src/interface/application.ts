export interface ISaveApplicationForm {
    id?: string;
    name: string;
    helpText: string;
    type: string;
    order: number;
    fields: ISaveApplicationFormField[];
}

export interface ISaveApplicationFormField {
    id?: string;
    name: string;
    helpText: string;
    fieldId: string;
    key: string;
    type: string;
    defaultValue: string;
    templateOptions: any;
    order: number;
    isRequired: boolean;
}

export interface IExecutionWorkflowCount {
    approval: number;
    inputRequest: number;
    clarification: number;
    draft: number;
    approved: number;
    reject: number;
    participated: number;
}

export interface IGetExecutionSelect {
    id: string;
    applicationId: string;
    name: string;
    title: string;
    status: string;
    createdAt: Date;
    createdBy: string;
    managerId: string;
    departmentId: number;
    officeLocationId: number;
    applicationWorkflowId: string;
    applicationWorkflowName: string;
    userPermissionId: string;
    assignTo: string;
    groupId: number;
    showMap: boolean;
}

export interface IMyItemReport {
    applicationId: string;
    applicationName: string;
    inProgress: number;
    completed: number;
    rejected: number;
}

export interface IUserWorkloadReport {
    applicationId: string;
    applicationName: string;
    assignToMe: number;
}

export interface IGetExecutionTimelineSelect {
    id: string;
    title: string;
    createdAt: Date;
    createdBy: string;
    applicationId: string;
    longitude: number;
    latitude: number;
}

export interface ITimeApplicationReport {
    applicationId: string;
    startDate: string;
    endDate: string;
}

export interface ITimeApplicationResponse {
    applicationId?: string;
    id?: string;
    title?: string;
    timeline?: (IExecutionTimeline | { [key: string]: any })[];
}

export interface IExecutionTimeline {
    applicationWorkflowId?: string;
    workflowType?: string;
    startedAt?: Date;
    endAt?: Date;
    timestamp?: string;
}

export interface ITotalExecutionCount {
    total: number;
    completed: number;
    inProgress: number;
    rejected: number;
    withdraw: number;
}

export interface ITotalExecutionMonthGraph {
    categories: string[];
    data: ITotalExecutionCount[];
}

export interface IExecutionLocation {
    applicationId: string;
    id: string;
    title: string;
    latitude: number;
    longitude: number;
}

export interface IReassignExecutionRequest {
    applicationId: string;
    executionId: string;
    workflowId: string;
    userId: string;
}

export interface IGetParticipatedUserSelect {
    createdBy: string;
    updatedBy: string;
}

export interface IGetWithdrawRequest {
    applicationId?: string;
    startDate?: string;
    endDate?: string;
}

export interface IApplicationExecutionInProcessQuery {
    userId: string;
    status: string;
    isAdmin?: boolean;
    applicationId?: string;
    isClarity?: boolean;
    startDate?: string;
    endDate?: string;
}

export interface IDeleteExecutionRequest {
    applicationId: string;
    loggedInUserId: string;
    startDate: string;
    endDate: string;
    status: string;
}
