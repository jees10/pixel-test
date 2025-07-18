import { User } from 'src/common/interfaces/user.interface';
import { BaseController } from 'src/lib/base.controller';
import { UsersService } from './users.service';
export declare class UsersController extends BaseController<User> {
    constructor(usersService: UsersService);
}
