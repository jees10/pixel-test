import { User } from 'src/common/interfaces/user.interface';
import { UsersDataProvider } from 'src/data-providers/users.provider';
import { BaseService } from 'src/lib/base.service';
export declare class UsersService extends BaseService<User> {
    constructor(userProvider: UsersDataProvider);
    create: (reqUser: User) => unknown;
    findByEmail: (email: string) => User;
    validate: (email: string, pass: string) => Promise<Omit<User, "password">>;
}
