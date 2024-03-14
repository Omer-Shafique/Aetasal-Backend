import * as boom from 'boom';
import * as listOfValueRepo from '../repositories/list-of-value';
import * as joiSchema from '../validations/schemas/list-of-value';
import { validate } from './../validations/index';
import { IListOfValueInstance } from './../models/list-of-value';

export const findByKeys = async (key: string): Promise<IListOfValueInstance[]> => {
  await validate({ key }, joiSchema.getListOfValueSchema);
  const keys: string[] = key.split(',');
  return listOfValueRepo.findByKeys(keys);
};
