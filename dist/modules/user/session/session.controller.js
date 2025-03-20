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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../../shared/decorators/auth.decorator");
const authorized_decorator_1 = require("../../../shared/decorators/authorized.decorator");
const ip_decorator_1 = require("../../../shared/decorators/ip.decorator");
const user_agent_decorator_1 = require("../../../shared/decorators/user-agent.decorator");
const session_service_1 = require("./session.service");
const login_input_1 = require("./input/login.input");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async me(user) {
        return user;
    }
    async login(request, input, ip, userAgent) {
        return this.sessionService.login(request.session, input, ip, userAgent);
    }
    async logout(request) {
        return this.sessionService.logout(request);
    }
    async findByUser(request) {
        return this.sessionService.findByUser(request.session.userId, request.session.id);
    }
    async clear(request, ip) {
        return this.sessionService.clear(request, ip);
    }
    async remove(request) {
        return this.sessionService.remove(request);
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Get)('me'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, ip_decorator_1.Ip)()),
    __param(3, (0, user_agent_decorator_1.UserAgent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_input_1.LoginInput, String, String]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('clear'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, ip_decorator_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "clear", null);
__decorate([
    (0, common_1.Delete)(':sessionId'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "remove", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map