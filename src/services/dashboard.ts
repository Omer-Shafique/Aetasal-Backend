import * as departmentRepo from '../repositories/department';
import * as groupRepo from '../repositories/group';
import * as officeLocationRepo from '../repositories/office-location';
import * as userRepo from '../repositories/user';
import * as roleRepo from '../repositories/role';
import { IAdminDashboardStatistics } from '../interface/dashboard';

export const getAdminDashboardStatistics = async () => {
    const response: IAdminDashboardStatistics = {
        inActiveUsers: 0,
        activeUsers: 0,
        departments: 0,
        officeLocations: 0,
        groups: 0,
        roles: 0
    };
    response.activeUsers = await userRepo.getActiveUserCount();
    response.inActiveUsers = await userRepo.getInActiveUserCount();
    response.departments = await departmentRepo.getCount();
    response.officeLocations = await officeLocationRepo.getCount();
    response.groups = await groupRepo.getCount();
    response.roles = await roleRepo.getCount();
    return response;
};
