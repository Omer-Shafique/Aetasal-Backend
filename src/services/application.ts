import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/application';
import * as applicationRepo from '../repositories/application';
import * as userRepo from '../repositories/user';
import { IApplicationInstance, IApplicationAttributes } from '../models/application';
import { Role } from '../enum/role';

export const getCurrentLoggedInUserApplications = async (loggedInUserId: string) => {
    const applications = await applicationRepo.getByUserId(loggedInUserId);
    const returnApplications = [];
    for (const application of applications) {
        const canEdit = application.canAllEdits || application.createdBy === loggedInUserId ||
            (application.editableUserIds ? application.editableUserIds.includes(loggedInUserId) : false);
        returnApplications.push({
            canEdit,
            ...application.get({ plain: true })
        });
    }
    return returnApplications;
};

export const getById = async (applicationId: string) => {
    const savedApp = await applicationRepo.findById(applicationId);
    if (!savedApp) {
        throw boom.badRequest('Invalid Application Id');
    }
    return savedApp;
};

export const saveApplication = async (loggedInUserId: string, application: IApplicationAttributes) => {
    await validate(application, joiSchema.saveApplication);
    if (application.id) {
        const savedApp = await applicationRepo.findById(application.id);
        if (!savedApp) {
            throw boom.badRequest('Invalid Application Id');
        }
    } else {
        application.createdBy = loggedInUserId;
    }
    const userIds = application.editableUserIds ? application.editableUserIds.split(',') : [];
    if (userIds && userIds.length) {
        const users = await userRepo.findByIds(userIds);
        if (!users || users.length !== userIds.length) {
            throw boom.badRequest('Invalid User');
        }
    }
    return applicationRepo.saveApplication(application);
};

export const publishApplication = async (id: string, userIds: string, canAllEdits: boolean, subject: string) => {
    let editableUserIds: string[] = [];
    if (userIds) {
        editableUserIds = userIds.split(',');
    }
    await validate({ id, editableUserIds, canAllEdits }, joiSchema.publishApplication);
    const application = await applicationRepo.findById(id);
    if (!application) {
        throw boom.badRequest('Invalid Application Id');
    }
    if (!canAllEdits && editableUserIds && editableUserIds.length) {
        const users = await userRepo.findByIds(editableUserIds);
        if (!users || users.length !== editableUserIds.length) {
            throw boom.badRequest('Invalid User');
        }
    }
    await applicationRepo.publishApplication(id, editableUserIds.join(','), canAllEdits, subject);
    return { success: true };
};

export const deleteApplication = async (id: string, loggedInUserId: string) => {
    await validate({ id }, joiSchema.deleteApplication);
    const application = await applicationRepo.findById(id);
    if (!application) {
        throw boom.badRequest('Invalid Application Id');
    }
    const deletedAt = new Date();
    const deletedBy = loggedInUserId;
    await applicationRepo.deleteApplication(id, deletedAt, deletedBy);
    return { success: true };
};
