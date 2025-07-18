"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySelect = exports.applyPagination = exports.applyConditions = exports.applyConditionsInOne = exports.mapFindOptionsForOne = exports.mapFindOptionsInArray = void 0;
const mapFindOptionsInArray = (array, filter) => {
    let filteredData = array;
    filter?.conditions && (filteredData = (0, exports.applyConditions)(filter.conditions, filteredData));
    filter?.page && (filteredData = (0, exports.applyPagination)(filter.page, filteredData));
    filter?.select && (filteredData = (0, exports.applySelect)(filter.select, filteredData));
    return filteredData;
};
exports.mapFindOptionsInArray = mapFindOptionsInArray;
const mapFindOptionsForOne = (array, filter) => {
    let foundItem = {};
    filter?.conditions && (foundItem = (0, exports.applyConditionsInOne)(filter.conditions, array));
    return foundItem;
};
exports.mapFindOptionsForOne = mapFindOptionsForOne;
const applyConditionsInOne = (conditions, array) => {
    if (Array.isArray(conditions)) {
        return conditions.reduce((acc, c) => [...acc, ...(0, exports.applyConditions)(c, array)], [])[0];
    }
    else {
        const currentFilters = conditions;
        const filteredData = array.filter(i => Object.entries(currentFilters).every(([key, value]) => value !== undefined ? i[key] === value : true));
        return filteredData[0];
    }
};
exports.applyConditionsInOne = applyConditionsInOne;
const applyConditions = (conditions, array) => {
    if (Array.isArray(conditions)) {
        return conditions.reduce((acc, c) => [...acc, ...(0, exports.applyConditions)(c, array)], []);
    }
    else {
        const currentFilters = conditions;
        const filteredData = array.filter(i => Object.entries(currentFilters).every(([key, value]) => value !== undefined ? i[key] === value : true));
        return filteredData;
    }
};
exports.applyConditions = applyConditions;
const applyPagination = (pagination, array) => {
    const { pageIndex, size } = pagination;
    const total = array.length;
    const start = (pageIndex - 1) * size;
    const end = start + size;
    const paginated = array.slice(start, end);
    return paginated;
};
exports.applyPagination = applyPagination;
const applySelect = (select, array) => {
    const filteredData = array.map((i) => {
        const newObject = Object.entries(i)
            .filter(([key]) => select.includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        return newObject;
    });
    return filteredData;
};
exports.applySelect = applySelect;
//# sourceMappingURL=filter.util.js.map