// import { Context } from 'koa';
// import * as fileService from '../services/file';
// import * as fs from 'fs';
// import sharp from 'sharp';
// import { PDFDocument } from 'pdf-lib';  
// import AdmZip from 'adm-zip'; 
// import mammoth from 'mammoth'; 

// export const saveExecutionFile = async (ctx: Context, next: () => void) => {
//   const file = ctx.request.files && ctx.request.files.file;
//   if (!file) {
//     ctx.throw(400, 'No file provided');
//     return;
//   }
  
//   const userEmail = ctx.state.user.email;
//   const applicationName = ctx.request.body.applicationName;

//   if (!applicationName) {
//     console.error('Application name is undefined.');
//   }

//   const date = new Date();
//   const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
//   const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '').replace(' ', '-');
//   const filePath = `${userEmail}_____${applicationName}_____${formattedDate}_____`;

//   const originalFilePath = `${filePath}${file.name}`;

//   try {
//     // Check the file type and optimize accordingly
//     if (file.type.startsWith('image/')) {
//       // Optimize image files and overwrite the original file
//       await sharp(file.path)
//         .toFormat('jpeg')  // You can also use .png() if preferred
//         .jpeg({ quality: 90 })  // Set the quality to avoid visible loss
//         .toFile(originalFilePath);
      
//     } else if (file.type === 'application/pdf') {
//       // Optimize PDF files and overwrite the original file
//       const pdfDoc = await PDFDocument.load(fs.readFileSync(file.path));
//       pdfDoc.compress();
//       const optimizedPdfBytes = await pdfDoc.save();
//       fs.writeFileSync(originalFilePath, optimizedPdfBytes);

//     } else if (file.type === 'application/zip') {
//       // Optimize ZIP files and overwrite the original file
//       const zip = new AdmZip(file.path);
//       zip.extractAllTo("/path/to/extracted", true);  // Extract the ZIP contents
//       // Re-create the ZIP with potentially optimized contents
//       zip.writeZip(originalFilePath);
      
//     } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       // For DOCX files: example with `mammoth` for basic optimization (text extraction, etc.)
//       const doc = fs.readFileSync(file.path);
//       const optimizedDoc = await mammoth.convertToHtml({ buffer: doc });
//       fs.writeFileSync(originalFilePath, optimizedDoc.value);
      
//     } else {
//       ctx.throw(400, 'Unsupported file type');
//     }

//     // Delete the original file after optimization
//     fs.unlinkSync(file.path);

//     // Save the optimized file path to the database or elsewhere
//     ctx.state.data = await fileService.saveExecutionFile(originalFilePath);

//   } catch (error) {
//     console.error('File optimization error:', error);
//     ctx.throw(500, 'Error in file optimization');
//   }

//   await next();
// };


























import { Context } from 'koa';
import * as fileService from '../services/file';

export const saveProfilePicture = async (ctx: Context, next: () => void) => {
  const file = ctx.request.files && ctx.request.files.file;
  const userId = ctx.state.user.userId;
  ctx.state.data = await fileService.saveProfilePicture(userId, file);
  await next();
};

export const saveExecutionFile = async (ctx: Context, next: () => void) => {
  const file = ctx.request.files && ctx.request.files.file;
  const userEmail = ctx.state.user.email;  // User's email
  const applicationName = ctx.request.body.applicationName;  // Application name from request body
  
  // Log to check if applicationName is available
  console.log('Application Name:', applicationName);  // Debug log

  if (!applicationName) {
    // If the applicationName is not available, you can log an error or handle it accordingly.
    console.error('Application name is undefined.');
  }

  const date = new Date();

  // Format the date to 'DD-MMM-YYYY'
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '').replace(' ', '-'); // '01-Jul-2024'

  // Generate a timestamp in 'YYYY-MM-DD_HH-MM-SS' format
  const timestamp = date.toISOString().split('T')[0]; // '2024-11-08'
  const time = date.toISOString().split('T')[1].split('.')[0].replace(/:/g, '-'); // '09-50-39'

  // Construct the file path as per your requested structure
  const filePath = `${userEmail}_____${applicationName}_____${formattedDate}_____`;

  // Use the new structured path for saving the file
  ctx.state.data = await fileService.saveExecutionFile(filePath, file);
  await next();

  console.log("Full Request Body:", ctx.request.body);

};
