//omer
import * as Boom from 'boom';
import * as joiSchema from '../validations/schemas/email';
import * as mustache from 'mustache';
import * as nodemailer from 'nodemailer';
import { validate } from '../validations/index';
import {
  IEmailConfiguration,
  IWelcomeEmail,
  INewPasswordCreationEmail,
  IAccountActivationEmail,
  IForgotPasswordEmail,
  ITeacherScheduleEmail,
  IScheduleConfirmationEmail,
  IScheduleCancellationEmail,
} from '../interface/email';
import * as config from '../config';
import * as constants from '../constants/email';

// Create Nodemailer transporter with email configuration
const transporter = nodemailer.createTransport({
  host: config.default.email.host,
  port: config.default.email.port,
  secure: config.default.email.secure, // true for 465, false for other ports
  auth: {
    user: config.default.email.user, // generated ethereal user
    pass: config.default.email.password, // generated ethereal password
  },
});

// Function to send email
const sendEmail = async (emailConfiguration: IEmailConfiguration): Promise<any> => {
  // Validate email configuration using Joi schemas
  await validate(emailConfiguration, {
    ...joiSchema.basicEmailConfiguration,
    ...joiSchema.emailConfiguration,
  });

  // Check if the template exists in the TEMPLATE_FILE constant
  if (!constants.TEMPLATE_FILE[emailConfiguration.template as keyof typeof constants.TEMPLATE_FILE]) {
    // Throw an error if the template is not found
    throw Boom.notFound('error.email.not_found');
  }

  // Render the email body using Mustache with the specified template
  const emailBody = mustache.render(
    constants.TEMPLATE_FILE[emailConfiguration.template as keyof typeof constants.TEMPLATE_FILE],
    emailConfiguration.dataMap,
    {
      // Provide a default value for the footer if it doesn't exist in the TEMPLATE_FILE constant
      footer: constants.TEMPLATE_FILE['footer' as keyof typeof constants.TEMPLATE_FILE],
    },
  );
  // Render the email subject using Mustache with the specified data map
  emailConfiguration.subject = mustache.render(
    emailConfiguration.subject,
    emailConfiguration.dataMap,
  );

  // Send the email using Nodemailer
  await transporter.sendMail({
    to: emailConfiguration.to,
    bcc: emailConfiguration.bcc,
    from: emailConfiguration.from,
    html: emailBody,
    subject: emailConfiguration.subject,
  });
  // Return success message
  return { success: true };
};

// Function to send welcome email
export const sendWelcomeEmail = async (payload: IWelcomeEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: `${config.default.server.frontendURL}/verify-email?email=${payload.email}&hash=${payload.hash}`,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.welcome.subject,
    template: constants.EMAIL_TEMPLATES.welcome.template,
  });
};

// Function to send account activation email
export const sendAccountActivationEmail = async (payload: IAccountActivationEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: payload.link,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.accountActivation.subject,
    template: constants.EMAIL_TEMPLATES.accountActivation.template,
  });
};

// Function to send forgot password email
export const sendForgotPasswordEmail = async (payload: IForgotPasswordEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      action: `${config.default.server.frontendURL}/reset-password?email=${payload.email}&hash=${payload.hash}`,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.forgotPassword.subject,
    template: constants.EMAIL_TEMPLATES.forgotPassword.template,
  });
};

// Function to send new password creation email
export const sendNewPasswordCreationEmail = async (payload: INewPasswordCreationEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: payload.link,
    },
    from: config.default.email.user,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.newPasswordCreation.subject,
    template: constants.EMAIL_TEMPLATES.newPasswordCreation.template,
  });
};

// Function to send teacher schedule email
export const sendTeacherScheduleEmail = async (payload: ITeacherScheduleEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      student: payload.student,
      time: payload.time,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.teacherSchedule.subject,
    template: constants.EMAIL_TEMPLATES.teacherSchedule.template,
  });
};

// Function to send schedule confirmation email
export const sendScheduleConfirmationEmail = async (payload: IScheduleConfirmationEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      tutor: payload.tutor,
      time: payload.time,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    bcc: ['mok.developer@gmail.com'],
    subject: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.subject,
    template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template,
  });
};

// Function to send schedule cancellation email
export const sendScheduleCancellationEmail = async (payload: IScheduleCancellationEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      student: payload.student,
      time: payload.time,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    bcc: ['mok.developer@gmail.com'],
    subject: constants.EMAIL_TEMPLATES.studentScheduleCancellation.subject,
    template: constants.EMAIL_TEMPLATES.studentScheduleCancellation.template,
  });
};








// import * as Boom from 'boom';
// import * as joiSchema from '../validations/schemas/email';
// import * as mustache from 'mustache';
// import * as nodemailer from 'nodemailer';
// import { validate } from '../validations/index';
// import {
//   IEmailConfiguration,
//   IWelcomeEmail,
//   INewPasswordCreationEmail,
//   IAccountActivationEmail,
//   IForgotPasswordEmail,
//   ITeacherScheduleEmail,
//   IScheduleConfirmationEmail,
//   IScheduleCancellationEmail,
// } from '../interface/email';
// import * as config from '../config';
// import * as constants from '../constants/email';

// const transporter = nodemailer.createTransport({
//   host: config.default.email.host,
//   port: config.default.email.port,
//   secure: config.default.email.secure, // true for 465, false for other ports
//   auth: {
//     user: config.default.email.user, // generated ethereal user
//     pass: config.default.email.password, // generated ethereal password
//   },
// });

// const sendEmail = async (emailConfiguration: IEmailConfiguration): Promise<any> => {
//   await validate(emailConfiguration, {
//     ...joiSchema.basicEmailConfiguration,
//     ...joiSchema.emailConfiguration,
//   });

//   if (!constants.TEMPLATE_FILE[emailConfiguration.template]) {
//     throw Boom.notFound('error.email.not_found');
//   }

//   const emailBody = mustache.render(
//     constants.TEMPLATE_FILE[emailConfiguration.template],
//     emailConfiguration.dataMap,
//     {
//       footer: constants.TEMPLATE_FILE['footer'],
//     },
//   );
//   emailConfiguration.subject = mustache.render(
//     emailConfiguration.subject,
//     emailConfiguration.dataMap,
//   );

//   await transporter.sendMail({
//     to: emailConfiguration.to,
//     bcc: emailConfiguration.bcc,
//     from: emailConfiguration.from,
//     html: emailBody,
//     subject: emailConfiguration.subject,
//   });
//   return { success: true };
// };

// export const sendWelcomeEmail = async (payload: IWelcomeEmail): Promise<any> => {
//   // const hash = await generateAndCacheUnsubscribeHash(payload.email);
//   return sendEmail({
//     dataMap: {
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       link: `${config.default.server.frontendURL}/verify-email?email=${payload.email}&hash=${
//         payload.hash
//       }`,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     subject: constants.EMAIL_TEMPLATES.welcome.subject,
//     template: constants.EMAIL_TEMPLATES.welcome.template,
//   });
// };

// export const sendAccountActivationEmail = async (
//   payload: IAccountActivationEmail,
// ): Promise<any> => {
//   // const hash = await generateAndCacheUnsubscribeHash(payload.email);
//   return sendEmail({
//     dataMap: {
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       link: payload.link,
//       // unsubscribeLink: `${config.frontend.url}${config.frontend.unsubscribeRoute}?email=${
//       //   payload.email
//       // }`,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     subject: constants.EMAIL_TEMPLATES.accountActivation.subject,
//     template: constants.EMAIL_TEMPLATES.accountActivation.template,
//   });
// };

// export const sendForgotPasswordEmail = async (payload: IForgotPasswordEmail): Promise<any> => {
//   return sendEmail({
//     dataMap: {
//       action: `${config.default.server.frontendURL}/reset-password?email=${payload.email}&hash=${
//         payload.hash
//       }`,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     subject: constants.EMAIL_TEMPLATES.forgotPassword.subject,
//     template: constants.EMAIL_TEMPLATES.forgotPassword.template,
//   });
// };

// export const sendNewPasswordCreationEmail = async (
//   payload: INewPasswordCreationEmail,
// ): Promise<any> => {
//   // const hash = await generateAndCacheUnsubscribeHash(payload.email);
//   return sendEmail({
//     dataMap: {
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       link: payload.link,
//       // unsubscribeLink: `${config.frontend.url}${config.frontend.unsubscribeRoute}?email=${
//       //   payload.email
//       // }`,
//     },
//     from: config.default.email.user,
//     to: [payload.email],
//     subject: constants.EMAIL_TEMPLATES.newPasswordCreation.subject,
//     template: constants.EMAIL_TEMPLATES.newPasswordCreation.template,
//   });
// };

// export const sendTeacherScheduleEmail = async (payload: ITeacherScheduleEmail): Promise<any> => {
//   return sendEmail({
//     dataMap: {
//       student: payload.student,
//       time: payload.time,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     subject: constants.EMAIL_TEMPLATES.teacherSchedule.subject,
//     template: constants.EMAIL_TEMPLATES.teacherSchedule.template,
//   });
// };

// export const sendScheduleConfirmationEmail = async (
//   payload: IScheduleConfirmationEmail,
// ): Promise<any> => {
//   return sendEmail({
//     dataMap: {
//       tutor: payload.tutor,
//       time: payload.time,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     bcc: ['mok.developer@gmail.com'],
//     subject: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.subject,
//     template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template,
//   });
// };

// export const sendScheduleCancellationEmail = async (
//   payload: IScheduleCancellationEmail,
// ): Promise<any> => {
//   return sendEmail({
//     dataMap: {
//       student: payload.student,
//       time: payload.time,
//     },
//     from: `"TutorsWebHub" <${config.default.email.user}>`,
//     to: [payload.email],
//     bcc: ['mok.developer@gmail.com'],
//     subject: constants.EMAIL_TEMPLATES.studentScheduleCancellation.subject,
//     template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template,
//   });
// };
