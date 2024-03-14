export interface IBasicEmailConfiguration {
  to: string[];
  from: string;
  bcc?: string[];
}

export interface ISESEmailConfiguration extends IBasicEmailConfiguration {
  subject: string;
  body: string;
}

export interface IEmailConfiguration extends IBasicEmailConfiguration {
  subject: string;
  template: string;
  dataMap: any;
}

export interface IWelcomeEmail {
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
}

export interface IForgotPasswordEmail {
  email: string;
  hash: string;
}

export interface IAccountActivationEmail {
  firstName: string;
  lastName: string;
  email: string;
  link: string;
}

export interface INewPasswordCreationEmail {
  firstName: string;
  lastName: string;
  email: string;
  link: string;
}

export interface ITeacherScheduleEmail {
  student: string;
  email: string;
  time: string;
}

export interface IScheduleConfirmationEmail {
  tutor: string;
  email: string;
  time: string;
}

export interface IScheduleCancellationEmail {
  student: string;
  email: string;
  time: string;
}
