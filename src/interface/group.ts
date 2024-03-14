export interface ISaveGroup {
    id?: number;
    name: string;
    userIds: string[];
}

export interface IGetGroupResponse {
    id?: number;
    name: string;
    userIds: string[];
}
