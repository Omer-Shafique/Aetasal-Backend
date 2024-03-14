import * as Joi from 'joi';
import { ApplicationExecutionStatus, ApplicationWorkflowType } from '../../enum/application';

export const saveApplication: Joi.SchemaMap = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    shortDescription: Joi.string().required(),
    userIds: Joi.string().allow([null, '']),
    canAllStart: Joi.boolean().required(),
    canAllEdits: Joi.boolean().required(),
    editableUserIds: Joi.string().allow([null, ''])
};

export const deleteApplication: Joi.SchemaMap = {
    id: Joi.string().uuid().required(),
};

export const saveApplicationForm: Joi.SchemaMap = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    helpText: Joi.string().allow([null, '']),
    type: Joi.string().required(),
    applicationFormFields: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        name: Joi.string().required(),
        helpText: Joi.string().allow([null, '']),
        fieldId: Joi.string().required(),
        key: Joi.string().required(),
        type: Joi.string().required(),
        icon: Joi.string().allow([null, '']),
        templateName: Joi.string().allow([null, '']),
        defaultValue: Joi.string().allow([null, '']),
        templateOptions: Joi.any(),
    }))
};

export const saveApplicationFormArray: Joi.SchemaMap = {
    payload: Joi.array().items(Joi.object({
        ...saveApplicationForm
    })).min(1)
};

export const saveApplicationWorkflow: Joi.SchemaMap = {
    id: Joi.string().uuid().allow([null, '']),
    name: Joi.string().required(),
    type: Joi.string().required(),
    stepId: Joi.string().uuid().allow([null, '']),
    assignTo: Joi.string().allow([null, '']),
    userIds: Joi.array().items(Joi.string().uuid())
};

export const saveApplicationWorkflowArray: Joi.SchemaMap = {
    payload: Joi.array().items(Joi.object({
        ...saveApplicationWorkflow
    })).min(1)
};

export const saveWorkflowFieldPermission: Joi.SchemaMap = {
    id: Joi.string().uuid().allow([null, '']),
    applicationWorkflowId: Joi.string().uuid().allow([null, '']),
    applicationFormSectionId: Joi.string().allow([null, '']),
    applicationFormFieldId: Joi.string().allow([null, '']),
    permission: Joi.string().required(),
    type: Joi.string().required(),
    conditions: Joi.any()
};

export const saveWorkflowFieldPermissionArray: Joi.SchemaMap = {
    payload: Joi.array().items(Joi.object({
        ...saveWorkflowFieldPermission
    })).min(1),
    applicationId: Joi.string().uuid().required(),
};

export const saveApplicationExecution: Joi.SchemaMap = {
    id: Joi.string().uuid().allow([null, '']),
    status: Joi.string().allow([null, '']),
    applicationExecutionForms: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        applicationFormFieldId: Joi.string().uuid().required(),
        value: Joi.any().required()
    }))
};

export const saveApplicationExecutionForm: Joi.SchemaMap = {
    id: Joi.string().uuid().required(),
    applicationExecutionForms: Joi.array().items(Joi.object({
        id: Joi.string().uuid().allow([null, '']),
        applicationFormFieldId: Joi.string().uuid().required(),
        value: Joi.any().required()
    }))
};

export const saveApplicationExecutionArray: Joi.SchemaMap = {
    payload: Joi.array().items(Joi.object({
        ...saveApplicationExecution
    })).min(1),
    applicationId: Joi.string().uuid().required(),
};

export const publishApplication: Joi.SchemaMap = {
    id: Joi.string().uuid().required(),
    editableUserIds: Joi.array().items(Joi.string().uuid().allow('')).allow(null),
    canAllEdits: Joi.boolean().required()
};

export const publishApplicationExecution: Joi.SchemaMap = {
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required(),
};

export const saveApplicationExecutionWorkflow: Joi.SchemaMap = {
    id: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required(),
    comments: Joi.array().items(Joi.object({
        userId: Joi.string().uuid(),
        userName: Joi.string(),
        time: Joi.date().required(),
        comment: Joi.string().required()
    })),
    status: Joi.string().required().valid([
        ApplicationExecutionStatus.DRAFT,
        ApplicationExecutionStatus.CLARITY,
        ApplicationExecutionStatus.REJECT,
        ApplicationExecutionStatus.APPROVED]),
    rejectionDetails: Joi.when('status', {
        is: ApplicationExecutionStatus.REJECT,
        then: Joi.object({
            userId: Joi.string().uuid().required(),
            comment: Joi.string().required()
        }).required()
    }),
    clarificationDetails: Joi.when('status', {
        is: ApplicationExecutionStatus.CLARITY,
        then: Joi.object({
            userId: Joi.string().uuid().required(),
            comment: Joi.string().required(),
        }).required()
    })
};

export const publishApplicationExecutionWorkflow: Joi.SchemaMap = {
    applicationExecutionWorkflowId: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    applicationExecutionId: Joi.string().uuid().required(),
};

export const getExecutionByLoggedInUserId: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    type: Joi.string().valid([
        ApplicationWorkflowType.APPROVAL,
        ApplicationWorkflowType.INPUT,
    ]).required(),
    status: Joi.string().valid([
        ApplicationExecutionStatus.DRAFT,
    ]).optional()
};

export const getExecutionInProcessLoggedInUserId: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    status: Joi.string().required().valid([
        ApplicationExecutionStatus.DRAFT,
        ApplicationExecutionStatus.APPROVED,
        ApplicationExecutionStatus.REJECT,
        ApplicationExecutionStatus.CLARITY,
        ApplicationExecutionStatus.IN_PROGRESS
    ])
};

export const getExecutionParticipatedLoggedInUserId: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    searchText: Joi.string().optional().allow(null, ''),
};

export const getApplicationExecutionTimeReport: Joi.SchemaMap = {
    applicationId: Joi.string().uuid().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
};

export const reassignWorkflow: Joi.SchemaMap = {
    applicationId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required(),
    workflowId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required(),
};

export const withdraw: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required(),
};

export const getExecutionParticipatedUsers: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    executionId: Joi.string().uuid().required()
};

export const deleteExecutionByApplicationId: Joi.SchemaMap = {
    loggedInUserId: Joi.string().uuid().required(),
    applicationId: Joi.string().uuid().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().required()
};
