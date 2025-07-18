import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from 'src/common/interfaces/user.interface';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login: (email: string, password: string) => Promise<AuthenticatedUser>;
}
