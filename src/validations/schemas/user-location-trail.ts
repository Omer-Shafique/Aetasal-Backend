import * as Joi from 'joi';

export const getAll: Joi.SchemaMap = {
  userId: Joi.string().uuid().required(),
  startDate: Joi.date(),
  endDate: Joi.date()
};

export const saveUserLocationTrail: Joi.SchemaMap = {
  userId: Joi.string().uuid().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
};
