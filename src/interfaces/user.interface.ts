
export interface IUser extends ICredentials{
    firstName: string;
    lastName: string;
    gender: string;
    birthday: Date;
}

export interface ICreateUser {
    message?: string;
    created: boolean;
}

export interface ICredentials {
    email: string;
    password: string;
}

export interface ICredentialUser {
    message?: string;
    token?: string;
    success: boolean;
}

type IUserProfile = Partial<Omit<IUser, "password">>;
export interface IUserToken extends IUserProfile {
    id: number;
}