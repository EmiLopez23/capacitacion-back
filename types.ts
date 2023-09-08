import { Roles } from "./utils/roles";

export interface User{
    username?: string;
    email: string;
    id?: number;
    role?: Roles | string;
    password?: string;
}

export type VerifiedUser = Omit<User, "id"> & { id: number }  


export type Email = {
    to: string;
    from?: string;
    subject: string;
    content: string;
}

export type UsersWithEmails = {
    email: string,
    username: string,
    qty: number
}