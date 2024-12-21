
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    gender: string;
    birthday: Date;
}

export interface ICreateUser {
    message?: string;
    created: boolean;
}