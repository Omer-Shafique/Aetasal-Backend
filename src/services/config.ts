import config from '../config';

export const getConfig = async () => {
    return { realTimeInterval: config.realTimeIntervalInMin };
};
