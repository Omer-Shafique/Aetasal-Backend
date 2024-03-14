import * as Joi from 'joi';

export const saveOfficeLocation: Joi.SchemaMap = {
    name: Joi.string().required(),
    userId: Joi.string().uuid().allow([null, ''])
};

export const deleteOfficeLocation: Joi.SchemaMap = {
    id: Joi.number().required(),
};
