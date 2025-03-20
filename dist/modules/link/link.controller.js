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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const link_service_1 = require("./link.service");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const authorized_decorator_1 = require("../../shared/decorators/authorized.decorator");
const create_input_1 = require("./input/create.input");
const ip_decorator_1 = require("../../shared/decorators/ip.decorator");
const user_agent_decorator_1 = require("../../shared/decorators/user-agent.decorator");
let LinkController = class LinkController {
    constructor(linkService) {
        this.linkService = linkService;
    }
    async create(input, user) {
        return this.linkService.create(input, user);
    }
    async getByAlias(alias) {
        return this.linkService.findByAlias(alias);
    }
    async getByUser(user) {
        return this.linkService.findByUser(user.id);
    }
    async deleteByAlias(alias) {
        return this.linkService.deleteByAlias(alias);
    }
    async redirect(res, alias, ip, userAgent) {
        await this.linkService.redirectUrl(res, alias, ip, userAgent);
    }
};
exports.LinkController = LinkController;
__decorate([
    (0, common_1.Post)('/shorten'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_input_1.CreateLinkInput, Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/info/:alias'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "getByAlias", null);
__decorate([
    (0, common_1.Get)('/info/'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Delete)('/:alias'),
    (0, auth_decorator_1.Authorization)(),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "deleteByAlias", null);
__decorate([
    (0, common_1.Get)('/:alias'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('alias')),
    __param(2, (0, ip_decorator_1.Ip)()),
    __param(3, (0, user_agent_decorator_1.UserAgent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "redirect", null);
exports.LinkController = LinkController = __decorate([
    (0, common_1.Controller)('link'),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], LinkController);
//# sourceMappingURL=link.controller.js.map