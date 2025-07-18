"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDataProvider = void 0;
const base_provider_1 = require("../lib/base.provider");
class UsersDataProvider extends base_provider_1.BaseProvider {
    constructor(dataService) {
        super('users', dataService);
    }
}
exports.UsersDataProvider = UsersDataProvider;
//# sourceMappingURL=users.provider.js.map