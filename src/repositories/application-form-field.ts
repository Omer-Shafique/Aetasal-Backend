import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IApplicationFormFieldInstance, IApplicationFormFieldAttributes } from '../models/application-form-field';

export const getByApplicationFormSectionId = async (applicationFormSectionId: string) => {
    return Models.ApplicationFormField.findAll({
        attributes: ['id', 'applicationFormSectionId', 'name', 'helpText', 'fieldId', 'key', 'type',
        'defaultValue', 'templateOptions', 'order', 'isRequired', 'isActive', 'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationFormSectionId
        },
        order: ['order']
    });
};

export const findById = async (id: string) => {
    return Models.ApplicationFormField.findOne({ where: { id }});
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationFormField.findAll({ where: { id: { [Sequelize.Op.in]: ids } }});
};

export const findBySectionIds = async (sectionIds: string[]) => {
    return Models.ApplicationFormField.findAll({ where: { applicationFormSectionId:
        { [Sequelize.Op.in]: sectionIds } }});
};

export const saveApplicationFormField = async (applicationFormField: IApplicationFormFieldAttributes) => {
    return Models.ApplicationFormField.upsert(applicationFormField, { returning: true })
        .then((res) => res[0]);
};

export const deleteApplicationFormField = async (id: string) => {
    return Models.ApplicationFormField.update({ isActive: false }, { where: { id }});
};
