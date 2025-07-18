import { Controller } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { BaseController } from 'src/lib/base.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/common/dtos/user.dto';

@Controller('users')
export class UsersController extends BaseController<User> {

  constructor(
    usersService: UsersService
  ) {
    super('User', usersService, CreateUserDto, UpdateUserDto)
  }
}
