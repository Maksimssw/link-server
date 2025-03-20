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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const account_service_1 = require("./account.service");
const throttler_config_1 = require("../../../core/config/throttler.config");
const create_input_1 = require("./input/create.input");
const change_password_input_1 = require("./input/change-password.input");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    create(input) {
        return this.accountService.create(input);
    }
    changePassword(request, body) {
        return this.accountService.changePassword(body, request.session.userId);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('create'),
    (0, throttler_1.Throttle)({ default: throttler_config_1.ThrottlerDefault.medium }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('password/change'),
    (0, throttler_1.Throttle)({ default: throttler_config_1.ThrottlerDefault.medium }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_input_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "changePassword", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map