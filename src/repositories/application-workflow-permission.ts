import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IApplicationWorkflowPermissionInstance,
    IApplicationWorkflowPermissionAttributes
} from '../models/application-workflow-permission';

export const findById = async (id: string) => {
    return Models.ApplicationWorkflowPermission.findOne({ where: { id }});
};

export const findByWorkflowId = async (applicationWorkflowId: string) => {
    return Models.ApplicationWorkflowPermission.findAll({ where: { applicationWorkflowId }});
};

export const saveApplicationWorkflowPermission =
    async (applicationWorkflowPermission: IApplicationWorkflowPermissionAttributes) => {
    return Models.ApplicationWorkflowPermission.upsert(applicationWorkflowPermission,
        { returning: true }).then((res) => res[0]);
};

export const deleteApplicationWorkflowPermission = async (id: string) => {
    return Models.ApplicationWorkflowPermission.update({ isActive: false }, { where: { id }});
};

export const deleteWorkflowPermissionByWorkflowId = async (applicationWorkflowId: string, userId: string) => {
    return Models.ApplicationWorkflowPermission.update({ isActive: false }, { where:
        { applicationWorkflowId, userId }});
};

export const hardDeleteWorkflowPermissionByWorkflowId = async (applicationWorkflowId: string) => {
    return Models.ApplicationWorkflowPermission.destroy({ where: { applicationWorkflowId }});
};
