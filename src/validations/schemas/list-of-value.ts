import * as Joi from 'joi';

export const getListOfValueSchema: Joi.SchemaMap = {
    key: Joi.string().required()
};
