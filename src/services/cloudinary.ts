import config from '../config';
const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: config.cloudinary.name, 
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

export const uploadProfileImage = (name: string, file: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file.path,
            {
              public_id: name,
            },
            (error: any, result: any) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
    });
}