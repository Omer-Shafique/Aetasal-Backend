import * as Joi from 'joi';

export const basicEmailConfiguration: Joi.SchemaMap = {
  to: Joi.array()
    .items(
      Joi.string()
        .required()
        .email(),
    )
    .min(1)
    .required()
    .label('to'),
  from: Joi.string()
    .required()
    .label('from'),
};

export const sesEmailConfiguration: Joi.SchemaMap = {
  subject: Joi.string()
    .required()
    .label('subject'),
  body: Joi.string()
    .required()
    .label('body'),
};

export const emailConfiguration: Joi.SchemaMap = {
  subject: Joi.string()
    .required()
    .label('subject'),
  template: Joi.string()
    .required()
    .label('template'),
  dataMap: Joi.any(),
};
