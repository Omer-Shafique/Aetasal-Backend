export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to Aetasaal',
    template: 'welcome',
  },
  forgotPassword: {
    subject: 'Aetasaal - Forgot Password',
    template: 'forgotPassword',
  },
  newPasswordCreation: {
    subject: 'Aetasaal - New Password creation request',
    template: 'newPasswordCreation',
  },
  accountActivation: {
    subject: 'Aetasaal - Account activation request',
    template: 'accountActivation',
  },
  teacherSchedule: {
    subject: 'Aetasaal - Schedule booking request',
    template: 'teacherSchedule',
  },
  studentScheduleConfirmation: {
    subject: 'Aetasaal - Schedule confirmation',
    template: 'studentScheduleConfirmation',
  },
  studentScheduleCancellation: {
    subject: 'Aetasaal - Schedule cancel',
    template: 'studentScheduleCancellation',
  },
};

// export const TEMPLATE_FILE: object = new Object();
export const TEMPLATE_FILE: { [key: string]: string } = {};
//omer
