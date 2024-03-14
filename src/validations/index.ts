import * as Joi from 'joi';

export const validate = async <T>(payload: T, schema: Joi.SchemaLike): Promise<T> => {
    const { error, value } = Joi.validate(payload, schema, {
      allowUnknown: true
    });

    if (error) {
        throw error;
    }

    return value;
};
