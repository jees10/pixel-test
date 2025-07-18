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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const base_provider_1 = require("./base.provider");
let BaseService = class BaseService {
    dataProvider;
    constructor(dataProvider) {
        this.dataProvider = dataProvider;
    }
    async findAll(query) {
        return this.dataProvider.findAll(query);
    }
    async findOneById(id) {
        return this.dataProvider.findById(id);
    }
    async count(query) {
        return this.dataProvider.count(query);
    }
    async create(entity) {
        return this.dataProvider.create(entity);
    }
    async update(id, fields) {
        return this.dataProvider.update(id, fields);
    }
    async delete(id) {
        return this.dataProvider.delete(id);
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [base_provider_1.BaseProvider])
], BaseService);
//# sourceMappingURL=base.service.js.map