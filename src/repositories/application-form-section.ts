import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IApplicationFormSectionInstance, IApplicationFormSectionAttributes } from '../models/application-form-section';

export const getByApplicationId = async (applicationId: string) => {
    return Models.ApplicationFormSection.findAll({
        attributes: ['id', 'applicationId', 'name', 'helpText', 'type', 'order',
         'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationId
        },
        include: [{
            model: Models.ApplicationFormField,
            attributes: ['id', 'applicationFormSectionId', 'name', 'helpText', 'fieldId', 'key', 'type',
                'defaultValue', 'lookupId', 'icon', 'templateName', 'templateOptions', 'order', 'isActive'],
            where: {
                isActive: true
            },
            // include: [{
            //     model: Models.Lookup,
            //     include: [Models.LookupData]
            // }],
            required: false
        }],
        order: [['order'], [Models.ApplicationFormField, 'order', 'asc']]
    });
};

export const findById = async (id: string) => {
    return Models.ApplicationFormSection.findOne({ where: { id }});
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationFormSection.findAll({ where: { id: { [Sequelize.Op.in]: ids } }});
};

export const saveApplicationFormSection = async (applicationFormSection: IApplicationFormSectionAttributes) => {
    return Models.ApplicationFormSection.upsert(applicationFormSection, { returning: true })
        .then((res) => res[0]);
};

export const deleteApplicationFormSection = async (id: string) => {
    return Models.ApplicationFormSection.update({ isActive: false }, { where: { id }});
};
