import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  login = async (email: string, password: string): Promise<AuthenticatedUser> => {
    const user = await this.userService.validate(email, password);
    if (user) {
      return {
        ...user,
        token: this.jwtService.sign(user)
      }
    } else {
      return null;
    }
  }
}
