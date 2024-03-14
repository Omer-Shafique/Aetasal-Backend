import * as boom from 'boom';
var _ = require('lodash')
import { validate } from '../validations/index';

import * as helper from '../utils/helper';
import * as joiSchema from '../validations/schemas/application';
import * as applicationRepo from '../repositories/application';
import * as applicationWorkflowFieldPermissionRepo from '../repositories/application-workflow-field-permission';
import * as applicationFormSectionRepo from '../repositories/application-form-section';
import * as applicationFormFieldRepo from '../repositories/application-form-field';
import * as userRepo from '../repositories/user';
import { IApplicationInstance, IApplicationAttributes } from '../models/application';
import { IApplicationFormSectionInstance, IApplicationFormSectionAttributes } from '../models/application-form-section';
import {
    IApplicationWorkflowFieldPermissionInstance,
    IApplicationWorkflowFieldPermissionAttributes
} from '../models/application-workflow-field-permission';
import { Role } from '../enum/role';

export const getByApplicationId = async (applicationId: string) => {
    const application = await applicationRepo.findById(applicationId);
    if (!application) {
        throw boom.badRequest('Invalid application id');
    }
    return applicationWorkflowFieldPermissionRepo.getByApplicationId(applicationId);
};

export const saveApplicationWorkflowFieldPermission =
    async (applicationId: string, payload: IApplicationWorkflowFieldPermissionAttributes[]) => {
    await validate({ payload, applicationId }, joiSchema.saveWorkflowFieldPermissionArray);
    const savedApp = await applicationRepo.findById(applicationId);
    if (!savedApp) {
        throw boom.badRequest('Invalid application id');
    }
    const ids: any = _.reject(payload.map(form => form.id), helper.rejectUndefinedOrNull);
    const applicationWorkflowFieldPermissions = await applicationWorkflowFieldPermissionRepo.findByIds(ids);
    if (applicationWorkflowFieldPermissions.length !== _.uniq(ids).length) {
        throw boom.badRequest('Invalid ids');
    }
    const sectionIds: any = _.reject(payload.map(form => form.applicationFormSectionId), helper.rejectUndefinedOrNull);
    const applicationSections = await applicationFormSectionRepo.findByIds(sectionIds);
    if (applicationSections.length !== _.uniq(sectionIds).length) {
        throw boom.badRequest('Invalid application section id');
    }
    const formIds: any = _.reject(payload.map(form => form.applicationFormFieldId), helper.rejectUndefinedOrNull);
    const savedApplicationForms = await applicationFormFieldRepo.findByIds(formIds);
    if (savedApplicationForms.length !== _.uniq(formIds).length) {
        throw boom.badRequest('Invalid application section field id');
    }
    await applicationWorkflowFieldPermissionRepo.hardDeleteApplicationWorkflowFieldPermission(applicationId);
    for (const form of payload) {
        form.applicationId = applicationId;
        await applicationWorkflowFieldPermissionRepo.saveApplicationWorkflowFieldPermission(form);
    }
    return getByApplicationId(applicationId);
};
