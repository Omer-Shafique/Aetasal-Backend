import * as Joi from 'joi';

export const saveLookup: Joi.SchemaMap = {
    name: Joi.string().required(),
};

export const saveLookupData: Joi.SchemaMap = {
    lookupId: Joi.number().required(),
    display: Joi.string().required(),
    value: Joi.string().required(),
};

export const deleteLookup: Joi.SchemaMap = {
    id: Joi.number().required(),
};
