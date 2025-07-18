"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProvidersModule = void 0;
const common_1 = require("@nestjs/common");
const events_provider_1 = require("./events.provider");
const users_provider_1 = require("./users.provider");
const data_service_1 = require("../services/data.service");
const repositories_1 = require("../common/constants/repositories");
let DataProvidersModule = class DataProvidersModule {
};
exports.DataProvidersModule = DataProvidersModule;
exports.DataProvidersModule = DataProvidersModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: repositories_1.EVENTS_REPOSITORY,
                useFactory: (dataService) => {
                    return new events_provider_1.EventsDataProvider(dataService);
                },
                inject: [data_service_1.DataService]
            },
            {
                provide: repositories_1.USERS_REPOSITORY,
                useFactory: (dataService) => {
                    return new users_provider_1.UsersDataProvider(dataService);
                },
                inject: [data_service_1.DataService]
            },
            data_service_1.DataService
        ],
        exports: [
            repositories_1.EVENTS_REPOSITORY,
            repositories_1.USERS_REPOSITORY
        ]
    })
], DataProvidersModule);
//# sourceMappingURL=data-providers.module.js.map