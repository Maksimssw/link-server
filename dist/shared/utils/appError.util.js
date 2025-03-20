"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const common_1 = require("@nestjs/common");
class AppError extends common_1.HttpException {
    constructor(error, message, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        super({ message, error, statusCode }, statusCode);
        this.error = error;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.util.js.map