import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { INotificationInstance, INotificationAttributes } from '../models/notification';

export const getAll = async () => {
    return Models.Notification.findAll({
        attributes: ['id', 'title', 'body', 'isRead', 'userId', 'createdAt', 'updatedAt'],
    });
};

export const findById = async (id: number) => {
    return Models.Notification.findOne({ where: { id }});
};

export const saveNotification = async (notification: INotificationAttributes) => {
    return Models.Notification.insertOrUpdate(notification);
};
