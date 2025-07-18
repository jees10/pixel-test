"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.tryParse = void 0;
const tryParse = (stringObj) => {
    try {
        const obj = JSON.parse(stringObj);
        return obj;
    }
    catch (error) {
        return {};
    }
};
exports.tryParse = tryParse;
const omit = (obj, keys) => {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
};
exports.omit = omit;
//# sourceMappingURL=object.util.js.map