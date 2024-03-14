export interface ILoginRequest {
    email: string;
    password: string;
    deviceId: string;
}

export interface ISignUpRequest {
    email: string;
    password: string;
    role: string;
    timezone: string;
}

export interface ISocialLoginRequest {
    name: string;
    email: string;
    phoneNo: string;
    socialProvider: string;
    pictureUrl?: string;
    accessToken: string;
    timezone: string;
    isSignUp: boolean;
    role?: string;
}

export interface IAuthResponse {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    contactNo: string;
    pictureUrl: string;
    gender: string;
    roles?: string[];
    isEmailVerified: boolean;
    isApproved: boolean;
    accessToken: string;
    timezone: string;
}

export interface IResetPassword {
    email: string;
    password: string;
    hash: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}
