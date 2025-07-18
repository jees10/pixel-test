import { User } from 'src/common/interfaces/user.interface';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: Omit<User, 'password'>): unknown;
}
export {};
