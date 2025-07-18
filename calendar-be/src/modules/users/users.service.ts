import { Inject, Injectable } from '@nestjs/common';
import { RequestFilters } from 'src/common/interfaces/request-filters.interface';
import { User } from 'src/common/interfaces/user.interface';
import { UsersDataProvider } from 'src/data-providers/users.provider';
import { BaseService } from 'src/lib/base.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'src/utils/object.util';
import { USERS_REPOSITORY } from 'src/common/constants/repositories';

@Injectable()
export class UsersService extends BaseService<User> {

  constructor(
    @Inject(USERS_REPOSITORY)
    userProvider: UsersDataProvider
  ) {
    super(userProvider);
  }

  create = async (reqUser: User) => {
    const user = {
      ...reqUser,
      password: await bcrypt.hash(reqUser.password, 12)
    }
    return super.create(user)
  }

  findByEmail = (email: string): User => {
    const query = {
      conditions: { email }
    }
    return this.dataProvider.findOneBy(query as RequestFilters<User>)
  }

  validate = async (email: string, pass: string): Promise<Omit<User, 'password'>> => {
    const user = this.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return omit(user, ['password'])
    } else {
      return null
    }
  }


}
