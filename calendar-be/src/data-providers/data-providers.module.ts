import { Module } from "@nestjs/common";
import { EventsDataProvider } from "./events.provider";
import { UsersDataProvider } from "./users.provider";
import { DataService } from "src/services/data.service";
import { EVENTS_REPOSITORY, USERS_REPOSITORY } from "src/common/constants/repositories";

@Module({
  providers: [
    {
      provide: EVENTS_REPOSITORY,
      useFactory: (dataService: DataService) => {
        return new EventsDataProvider(dataService)
      },
      inject: [DataService]
    },
    {
      provide: USERS_REPOSITORY,
      useFactory: (dataService: DataService) => {
        return new UsersDataProvider(dataService)
      },
      inject: [DataService]
    },
    DataService
  ],
  exports: [
    EVENTS_REPOSITORY,
    USERS_REPOSITORY
  ]
})
export class DataProvidersModule { }