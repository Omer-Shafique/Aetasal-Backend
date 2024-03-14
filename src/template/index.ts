import * as fs from 'fs-extra';
import * as path from 'path';
import { TEMPLATE_FILE } from '../constants/email';

export const loadTemplates = async () => {
  const dir = __dirname + '/email/';
  if (!fs.existsSync(dir)) {
    await fs.mkdir(__dirname + '/email');
    await fs.copy(path.join(__dirname, '/../../src/template/email'), dir);
  }

  // const uploadDir = path.join(__dirname, '/../upload/profile');
  // if (!fs.existsSync(uploadDir)) {
  //   await fs.mkdir(uploadDir);
  //   await fs.copy(path.join(__dirname, '/../../src/upload/profile'), uploadDir, { recursive: true });
  // }

  fs.readdirSync(dir).forEach(file => {
    let templateName = file;
    if (templateName.includes('.')) {
      templateName = templateName.substring(0, templateName.lastIndexOf('.'));
    }

    TEMPLATE_FILE[templateName] = fs.readFileSync(dir + file).toString();
  });
};
