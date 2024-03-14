import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import {
    IApplicationExecutionWorkflowInstance,
    IApplicationExecutionWorkflowAttributes
} from '../models/application-execution-workflow';

export const getByApplicationExecutionId = async (applicationExecutionId: string) => {
    return Models.ApplicationExecutionWorkflow.findAll({
        attributes: ['id', 'applicationExecutionId', 'applicationWorkflowId', 'status',
        'comments', 'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationExecutionId
        },
        include: [{
            model: Models.ApplicationWorkflow,
            where: {
                isActive: true
            }
        }]
    });
};

export const getByApplicationExecutionIds = async (applicationExecutionIds: string[]) => {
    return Models.ApplicationExecutionWorkflow.findAll({
        attributes: ['id', 'applicationExecutionId', 'applicationWorkflowId', 'status',
            'comments', 'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationExecutionId: {
                [Sequelize.Op.in]: applicationExecutionIds
            }
        },
        include: [{
            model: Models.ApplicationWorkflow,
            where: {
                isActive: true
            }
        }],
        order: [['createdAt', 'desc']]
    });
};

export const findById = async (id: string) => {
    return Models.ApplicationExecutionWorkflow.findOne({ where: { id }, include: [Models.ApplicationWorkflow]});
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationExecutionWorkflow.findAll({ where: { id: { [Sequelize.Op.in]: ids } }});
};

export const findByExecutionAndWorkflowId = async (applicationExecutionId: string, applicationWorkflowId: string) => {
    return Models.ApplicationExecutionWorkflow.findOne({ where: { applicationExecutionId, applicationWorkflowId }});
};

export const saveApplicationExecutionWorkflow =
    async (applicationExecutionForm: IApplicationExecutionWorkflowAttributes) => {
    return Models.ApplicationExecutionWorkflow.upsert(applicationExecutionForm, { returning: true })
        .then((res) => res[0]);
};

export const updateApplicationExecutionWorkflow =
    async (status: string, applicationExecutionId: string, applicationWorkflowId: string) => {
    return Models.ApplicationExecutionWorkflow.update({ status }, { where: {
        applicationExecutionId,
        applicationWorkflowId
    }})
        .then((res) => res[0]);
};

export const updateStatusById =
    async (status: string, id: string) => {
    return Models.ApplicationExecutionWorkflow.update({ status }, { where: {
        id,
    }})
        .then((res) => res[0]);
};

export const deleteApplicationExecutionWorkflowForm = async (id: string) => {
    return Models.ApplicationExecutionWorkflow.update({ isActive: false }, { where: { id }});
};
