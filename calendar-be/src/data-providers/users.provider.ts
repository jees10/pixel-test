import { User } from "src/common/interfaces/user.interface";
import { BaseProvider } from "src/lib/base.provider";
import { DataService } from "src/services/data.service";

export class UsersDataProvider extends BaseProvider<User> {
  constructor(
    dataService: DataService
  ) {
    super('users', dataService)
  }
}