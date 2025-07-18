"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandlingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ExceptionHandlingInterceptor = class ExceptionHandlingInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            const req = context.switchToHttp().getRequest();
            const isHttpException = error instanceof common_1.HttpException;
            if (isHttpException) {
                return (0, rxjs_1.throwError)(() => error);
            }
            else {
                console.error('Unexpected error:', error);
                const enhancedError = {
                    statusCode: 500,
                    timestamp: new Date().toISOString(),
                    path: req.url,
                    method: req.method,
                    message: error?.message || 'Unexpected error occurred',
                    errorName: error?.name || 'InternalServerError',
                    stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
                };
                return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException(enhancedError));
            }
        }));
    }
};
exports.ExceptionHandlingInterceptor = ExceptionHandlingInterceptor;
exports.ExceptionHandlingInterceptor = ExceptionHandlingInterceptor = __decorate([
    (0, common_1.Injectable)()
], ExceptionHandlingInterceptor);
//# sourceMappingURL=error-handling.decorator.js.map