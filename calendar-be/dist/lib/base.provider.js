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
exports.BaseProvider = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../services/data.service");
const filter_util_1 = require("../utils/filter.util");
let BaseProvider = class BaseProvider {
    dataService;
    collection;
    constructor(collection, dataService) {
        this.dataService = dataService;
        this.collection = collection;
    }
    findAll(filters) {
        const db = this.dataService.readDB();
        const results = db[this.collection] || [];
        const filteredResults = (0, filter_util_1.mapFindOptionsInArray)(results, filters);
        return filteredResults;
    }
    findById(id) {
        const db = this.dataService.readDB();
        const item = db[this.collection].find((i) => i.id === +id);
        if (!item)
            throw new common_1.NotFoundException(`${this.collection} item not found`);
        return item;
    }
    findOneBy(filters) {
        const db = this.dataService.readDB();
        const results = db[this.collection] || [];
        const filteredItem = (0, filter_util_1.mapFindOptionsForOne)(results, filters);
        return filteredItem;
    }
    count(filters) {
        const db = this.dataService.readDB();
        const results = db[this.collection] || [];
        const filteredResults = (0, filter_util_1.mapFindOptionsInArray)(results, filters);
        return { count: filteredResults.length };
    }
    create(item) {
        const db = this.dataService.readDB();
        const newItem = { id: Date.now(), ...item };
        db[this.collection].push(newItem);
        this.dataService.writeDB(db);
        return newItem;
    }
    update(id, data) {
        const db = this.dataService.readDB();
        const index = db[this.collection].findIndex((i) => i.id === +id);
        if (index === -1)
            throw new common_1.NotFoundException(`${this.collection} item not found`);
        db[this.collection][index] = { ...db[this.collection][index], ...data };
        this.dataService.writeDB(db);
        return db[this.collection][index];
    }
    delete(id) {
        const db = this.dataService.readDB();
        const index = db[this.collection].findIndex((i) => i.id === +id);
        if (index === -1)
            throw new common_1.NotFoundException(`${this.collection} item not found`);
        const [deleted] = db[this.collection].splice(index, 1);
        this.dataService.writeDB(db);
        return deleted;
    }
};
exports.BaseProvider = BaseProvider;
exports.BaseProvider = BaseProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, data_service_1.DataService])
], BaseProvider);
//# sourceMappingURL=base.provider.js.map