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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const object_util_1 = require("../utils/object.util");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseController {
    entityService;
    createDtoClass;
    updateDtoClass;
    entityName;
    constructor(entityName, entityService, createDtoClass, updateDtoClass) {
        this.entityService = entityService;
        this.createDtoClass = createDtoClass;
        this.updateDtoClass = updateDtoClass;
        this.entityName = entityName;
    }
    entityExists = async (id) => {
        const entity = await this.entityService.findOneById(id);
        if (!entity) {
            throw new common_1.NotFoundException(`${this.entityName} with ID ${id} not found`);
        }
        return entity;
    };
    findAll(filter) {
        const query = (0, object_util_1.tryParse)(filter);
        return this.entityService.findAll(query);
    }
    count(filter) {
        const query = (0, object_util_1.tryParse)(filter);
        return this.entityService.count(query);
    }
    findOne(id) {
        return this.entityExists(id);
    }
    create(newEntity) {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(this.createDtoClass, newEntity);
        const errors = (0, class_validator_1.validateSync)(dtoInstance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            const messages = errors
                .map(err => Object.values(err.constraints || {}))
                .flat();
            throw new common_1.BadRequestException(messages);
        }
        return this.entityService.create(dtoInstance);
    }
    async update(id, entityToUpdate) {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(this.createDtoClass, entityToUpdate);
        const errors = (0, class_validator_1.validateSync)(dtoInstance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            const messages = errors
                .map(err => Object.values(err.constraints || {}))
                .flat();
            throw new common_1.BadRequestException(messages);
        }
        this.entityExists(id);
        return this.entityService.update(id, dtoInstance);
    }
    async remove(id) {
        this.entityExists(id);
        return this.entityService.delete(id);
    }
}
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Get)(),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BaseController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], BaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BaseController.prototype, "remove", null);
//# sourceMappingURL=base.controller.js.map