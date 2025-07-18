"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_provider_1 = require("../../data-providers/users.provider");
const base_service_1 = require("../../lib/base.service");
const bcrypt = require("bcrypt");
const object_util_1 = require("../../utils/object.util");
const repositories_1 = require("../../common/constants/repositories");
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(userProvider) {
        super(userProvider);
    }
    create = async (reqUser) => {
        const user = {
            ...reqUser,
            password: await bcrypt.hash(reqUser.password, 12)
        };
        return super.create(user);
    };
    findByEmail = (email) => {
        const query = {
            conditions: { email }
        };
        return this.dataProvider.findOneBy(query);
    };
    validate = async (email, pass) => {
        const user = this.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            return (0, object_util_1.omit)(user, ['password']);
        }
        else {
            return null;
        }
    };
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repositories_1.USERS_REPOSITORY)),
    __metadata("design:paramtypes", [users_provider_1.UsersDataProvider])
], UsersService);
//# sourceMappingURL=users.service.js.map