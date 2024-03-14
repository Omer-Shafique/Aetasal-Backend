import * as fcmUtils from '../utils/fcm';
import * as logger from '../utils/logger';

const fcm = fcmUtils.getFCM();
const log = logger.getLoggerInstance();

/**
 * Send push notification to the user
 *
 * @param {string} token Registered token of user's device
 * @param {Object} _data An data you want to send with the notification
 * @param {string} _title Title of notification
 * @param {string} _body Description/body of notification
 *
 * @return none
 */
export const sendPushNotification = (token: string, data: any, title: string, body: string) => {
    data.title = title;
    data.body = body;
    data.id = data._id;
    const message = {
      to: token, // required fill with device token or topics
      data,
      content_available: true,
      notification: {
        title,
        body,
        sound: 'default',
        click_action: 'FCM_PLUGIN_ACTIVITY',
        icon: 'fcm_push_icon'
      }
    };
    fcm.send(message)
      .then((response: any) => {
        log.info('Successfully sent with response: ', response);
      })
      .catch((err: any) => {
        log.info('Something has gone wrong!', err);
    });
};
