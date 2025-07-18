import { IEntity } from "./entity.interface";
export interface User extends IEntity {
    email: string;
    name: string;
    password: string;
}
export interface AuthenticatedUser extends Omit<User, 'password'> {
    token: string;
}
