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

const transporter = nodemailer.createTransport({
  host: config.default.email.host,
  port: config.default.email.port,
  secure: config.default.email.secure, // true for 465, false for other ports
  auth: {
    user: config.default.email.user, // generated ethereal user
    pass: config.default.email.password, // generated ethereal password
  },
});

const sendEmail = async (emailConfiguration: IEmailConfiguration): Promise<any> => {
  await validate(emailConfiguration, {
    ...joiSchema.basicEmailConfiguration,
    ...joiSchema.emailConfiguration,
  });

  if (!constants.TEMPLATE_FILE[emailConfiguration.template]) {
    throw Boom.notFound('error.email.not_found');
  }

  const emailBody = mustache.render(
    constants.TEMPLATE_FILE[emailConfiguration.template],
    emailConfiguration.dataMap,
    {
      footer: constants.TEMPLATE_FILE['footer'],
    },
  );
  emailConfiguration.subject = mustache.render(
    emailConfiguration.subject,
    emailConfiguration.dataMap,
  );

  await transporter.sendMail({
    to: emailConfiguration.to,
    bcc: emailConfiguration.bcc,
    from: emailConfiguration.from,
    html: emailBody,
    subject: emailConfiguration.subject,
  });
  return { success: true };
};

export const sendWelcomeEmail = async (payload: IWelcomeEmail): Promise<any> => {
  // const hash = await generateAndCacheUnsubscribeHash(payload.email);
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: `${config.default.server.frontendURL}/verify-email?email=${payload.email}&hash=${
        payload.hash
      }`,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.welcome.subject,
    template: constants.EMAIL_TEMPLATES.welcome.template,
  });
};

export const sendAccountActivationEmail = async (
  payload: IAccountActivationEmail,
): Promise<any> => {
  // const hash = await generateAndCacheUnsubscribeHash(payload.email);
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: payload.link,
      // unsubscribeLink: `${config.frontend.url}${config.frontend.unsubscribeRoute}?email=${
      //   payload.email
      // }`,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.accountActivation.subject,
    template: constants.EMAIL_TEMPLATES.accountActivation.template,
  });
};

export const sendForgotPasswordEmail = async (payload: IForgotPasswordEmail): Promise<any> => {
  return sendEmail({
    dataMap: {
      action: `${config.default.server.frontendURL}/reset-password?email=${payload.email}&hash=${
        payload.hash
      }`,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.forgotPassword.subject,
    template: constants.EMAIL_TEMPLATES.forgotPassword.template,
  });
};

export const sendNewPasswordCreationEmail = async (
  payload: INewPasswordCreationEmail,
): Promise<any> => {
  // const hash = await generateAndCacheUnsubscribeHash(payload.email);
  return sendEmail({
    dataMap: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      link: payload.link,
      // unsubscribeLink: `${config.frontend.url}${config.frontend.unsubscribeRoute}?email=${
      //   payload.email
      // }`,
    },
    from: config.default.email.user,
    to: [payload.email],
    subject: constants.EMAIL_TEMPLATES.newPasswordCreation.subject,
    template: constants.EMAIL_TEMPLATES.newPasswordCreation.template,
  });
};

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

export const sendScheduleConfirmationEmail = async (
  payload: IScheduleConfirmationEmail,
): Promise<any> => {
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

export const sendScheduleCancellationEmail = async (
  payload: IScheduleCancellationEmail,
): Promise<any> => {
  return sendEmail({
    dataMap: {
      student: payload.student,
      time: payload.time,
    },
    from: `"TutorsWebHub" <${config.default.email.user}>`,
    to: [payload.email],
    bcc: ['mok.developer@gmail.com'],
    subject: constants.EMAIL_TEMPLATES.studentScheduleCancellation.subject,
    template: constants.EMAIL_TEMPLATES.studentScheduleConfirmation.template,
  });
};
