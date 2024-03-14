import * as boom from 'boom';
var _ = require('lodash')
import { validate } from '../validations/index';

import * as helper from '../utils/helper';
import * as joiSchema from '../validations/schemas/application';
import * as applicationRepo from '../repositories/application';
import * as applicationWorkflowRepo from '../repositories/application-workflow';
import * as applicationFormFieldRepo from '../repositories/application-form-field';
import * as applicationWorkflowPermissionRepo from '../repositories/application-workflow-permission';
import * as applicationFormSectionRepo from '../repositories/application-form-section';
import * as userRepo from '../repositories/user';
import * as groupRepo from '../repositories/group';
import { IApplicationInstance, IApplicationAttributes } from '../models/application';
import { IApplicationWorkflowInstance, IApplicationWorkflowAttributes } from '../models/application-workflow';
import { Role } from '../enum/role';
import { ApplicationWorkflowAssignTo } from '../enum/application';

export const getByApplicationId = async (applicationId: string): Promise<IApplicationWorkflowInstance[]> => {
    const application = await applicationRepo.findById(applicationId);
    if (!application) {
        throw boom.badRequest('Invalid application id');
    }
    return applicationWorkflowRepo.getByApplicationId(applicationId);
};

export const saveApplicationWorkflow = async (applicationId: string,
                                              loggedInUserId: string,
                                              applicationWorkflows: IApplicationWorkflowAttributes[]) => {
    await validate({ payload: applicationWorkflows }, joiSchema.saveApplicationWorkflowArray);
    const savedApp = await applicationRepo.findById(applicationId);
    if (!savedApp) {
        throw boom.badRequest('Invalid application id');
    }
    const ids: any = _.reject(applicationWorkflows.map(form => form.id), helper.rejectUndefinedOrNull);
    const applicationSections = await applicationWorkflowRepo.findByIds(ids);
    if (applicationSections.length !== ids.length) {
        throw boom.badRequest('Invalid application workflow id');
    }
    let userIds = _.reject(applicationWorkflows.map(form => form.userIds), _.isUndefined);
    userIds = _.flatMap(userIds);
    if (userIds && userIds.length) {
        const users = await userRepo.findByIds(userIds);
        if (users.length !== _.uniq(userIds).length) {
            throw boom.badRequest('Invalid user ids');
        }
    }
    let workflowIndex = 1;
    for (const workflow of applicationWorkflows) {
        workflow.applicationId = applicationId;
        workflow.order = workflowIndex;
        if (workflow.id) {
            await applicationWorkflowPermissionRepo.hardDeleteWorkflowPermissionByWorkflowId(workflow.id);
            workflow.updatedBy = loggedInUserId;
            if (workflow.assignTo !== ApplicationWorkflowAssignTo.GROUP) {
                workflow.groupId = null;
            }
        } else {
            workflow.createdBy = loggedInUserId;
        }
        if (workflow.groupId) {
            const group = await groupRepo.findById(workflow.groupId);
            if (!group) {
                throw boom.badRequest('Invalid group id');
            }
        }
        const savedWorkflow = await applicationWorkflowRepo.saveApplicationWorkflow(workflow);
        if (!workflow.userIds) {
            workflow.userIds = [];
        }
        for (const userId of workflow.userIds) {
            const newPermission = {
                applicationWorkflowId: savedWorkflow.id,
                userId
            };
            await applicationWorkflowPermissionRepo.saveApplicationWorkflowPermission(newPermission);
        }
        workflowIndex += 1;
    }
    return getByApplicationId(applicationId);
};
