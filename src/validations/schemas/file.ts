import * as Joi from 'joi';
import { SUPPORTED_PICTURE_TYPES, FILE_MAX_SIZE, FILE_MIN_SIZE } from '../../constants/file';

export const uploadUserProfileImage: Joi.SchemaMap = {
  file: Joi.object()
    .keys({
      size: Joi.number()
        .required()
        .less(FILE_MAX_SIZE)
        .greater(FILE_MIN_SIZE)
        .error(new Error('File Size must be less than 5mb')),
      path: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string()
        .required()
        .valid(...SUPPORTED_PICTURE_TYPES),
    })
    .required(),
};

export const uploadExecutionFile: Joi.SchemaMap = {
  file: Joi.object()
    .keys({
      size: Joi.number()
        .required()
        .less(FILE_MAX_SIZE)
        .greater(FILE_MIN_SIZE)
        .error(new Error('File Size must be less than 5mb')),
      path: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string(),
    })
    .required(),
};
