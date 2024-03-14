import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as cloudinary from './cloudinary';
import * as joiSchema from '../validations/schemas/file';
import { validate } from './../validations/index';

export const saveProfilePicture = async (userId: string, file: any) => {
  await validate({ file }, joiSchema.uploadUserProfileImage);
  const fileName = file.name;
  const nameToSave = `/upload/profile/${userId}_${fileName}`;
  const buff = fs.readFileSync(file.path);
  if (!fs.existsSync(`${__dirname}/../../upload/profile`)) {
    fs.mkdirSync(`${__dirname}/../../upload/profile`);
  }
  fs.writeFileSync(`${__dirname}/../../${nameToSave}`, buff);
  return { fileKey: `${userId}_${fileName}` };
};

export const uploadProfilePicture = async (userId: string, file: any) => {
  await validate({ file }, joiSchema.uploadUserProfileImage);
  const nameArr = file.name.split('.');
  const fileName = file.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') +
  '.' + nameArr[nameArr.length - 1];
  const result: any = await cloudinary.uploadProfileImage(`${userId}_${fileName}`, file);
  return { url: result.url };
};

export const saveExecutionFile = async (prefix: string, file: any) => {
  await validate({ file }, joiSchema.uploadExecutionFile);
  const nameArr = file.name.split('.');
  const fileName = `${prefix}_${moment().unix()}_${file.name}`.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') +
    '.' + nameArr[nameArr.length - 1];
  const nameToSave = `./upload/${fileName}`;
  const buff = fs.readFileSync(file.path);
  fs.outputFileSync(nameToSave, buff);
  return { fileKey: `${fileName}` };
};
