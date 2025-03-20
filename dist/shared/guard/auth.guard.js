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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../repositories/prisma/user.repository");
let AuthGuard = class AuthGuard {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (typeof request.session.userId === 'undefined')
            throw new common_1.UnauthorizedException('The user is not logged in');
        request.user = await this.userRepository.findById(request.session.userId);
        if (!request.user)
            throw new common_1.UnauthorizedException('The user is not logged in');
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map