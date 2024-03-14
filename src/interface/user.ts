export interface IUserRequest {
    id?: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    pictureUrl?: string;
    gender: string;
    country: string;
    city: string;
    email: string;
    password?: string;
    timezone?: number;
    roleIds: number[];
    managerId: string;
    departmentId: number;
    officeLocationId: number;
}
