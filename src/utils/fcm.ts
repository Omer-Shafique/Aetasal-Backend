import * as FCM from 'fcm-push';
import config from '../config';

let globalFcm: any;

const getFCMInstance = () => {
    if (globalFcm) {
        return globalFcm;
    }

    globalFcm = new FCM(config.fcm.serverKey);

    return globalFcm;
};

export const getFCM = () => getFCMInstance();
