import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IApplicationWorkflowFieldPermissionInstance,
    IApplicationWorkflowFieldPermissionAttributes
} from '../models/application-workflow-field-permission';

export const findById = async (id: string) => {
    return Models.ApplicationWorkflowFieldPermission.findOne({ where: { id }});
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationWorkflowFieldPermission.findAll({ where: { id: { [Sequelize.Op.in]: ids } }});
};

export const getByApplicationId = async (applicationId: string) => {
    return Models.ApplicationWorkflowFieldPermission.findAll({ where: { applicationId }});
};

export const saveApplicationWorkflowFieldPermission =
    async (applicationWorkflowFieldPermission: IApplicationWorkflowFieldPermissionAttributes) => {
    return Models.ApplicationWorkflowFieldPermission.upsert(applicationWorkflowFieldPermission, { returning: true })
        .then((res) => res[0]);
};

export const deleteApplicationWorkflowFieldPermission = async (id: string) => {
    return Models.ApplicationWorkflowFieldPermission.update({ isActive: false }, { where: { id }});
};

export const hardDeleteApplicationWorkflowFieldPermission = async (applicationId: string) => {
    return Models.ApplicationWorkflowFieldPermission.destroy({ where: { applicationId }});
};
