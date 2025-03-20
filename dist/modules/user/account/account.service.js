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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const user_repository_1 = require("../../../repositories/prisma/user.repository");
const appError_util_1 = require("../../../shared/utils/appError.util");
const error_enum_1 = require("../../../shared/enum/error.enum");
let AccountService = class AccountService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(input) {
        const { email, username, password } = input;
        const isExist = await this.userRepository.existing(username, email);
        if (isExist) {
            if (isExist.email === email)
                throw new appError_util_1.AppError(error_enum_1.ErrorStatus.EMAIL_EXIST, `Емайл ${email} уже существует`);
            if (isExist.username === username)
                throw new appError_util_1.AppError(error_enum_1.ErrorStatus.USERNAME_EXIST, `Username ${username} уже существует`);
        }
        const hashPassword = await (0, argon2_1.hash)(password);
        await this.userRepository.add({ ...input, password: hashPassword });
        return { result: true };
    }
    async changePassword(input, userId) {
        const { password, oldPassword } = input;
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.USER_NOT_EXIST, "Не удалось найти пользователя", common_1.HttpStatus.NOT_FOUND);
        const isValidPassword = await (0, argon2_1.verify)(user.password, oldPassword);
        if (!isValidPassword)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.INVALID_PASSWORD, 'Неверный пароль пользователя');
        await this.userRepository.update(userId, { password: await (0, argon2_1.hash)(password) });
        return { result: true };
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], AccountService);
//# sourceMappingURL=account.service.js.map