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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const argon2_1 = require("argon2");
const user_repository_1 = require("../../../repositories/prisma/user.repository");
const redis_service_1 = require("../../../core/redis/redis.service");
const session_util_1 = require("../../../shared/utils/session.util");
const error_enum_1 = require("../../../shared/enum/error.enum");
const appError_util_1 = require("../../../shared/utils/appError.util");
const metadata_util_1 = require("../../../shared/utils/metadata.util");
let SessionService = class SessionService {
    constructor(userRepository, configService, redisService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.redisService = redisService;
    }
    async login(session, input, ip, userAgent) {
        const { login, password } = input;
        const user = await this.userRepository.findByLogin(login);
        if (!user)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.USER_NOT_EXIST, `Не удалось найти пользователя по ${login}`);
        const isValidPassword = await (0, argon2_1.verify)(user.password, password);
        if (!isValidPassword)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.INVALID_PASSWORD, 'Введен неверный пароль');
        const metadata = (0, metadata_util_1.getMetadata)(ip, userAgent);
        return (0, session_util_1.saveSession)(this.redisService, session, user, metadata);
    }
    async logout(request) {
        const { session } = request;
        await (0, session_util_1.destroySession)(this.redisService, session);
        request.res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
        return { result: true };
    }
    async findByUser(userId, sessionId) {
        const sessionIds = await this.redisService.smembers(`user:sessions:${userId}`);
        const userSessions = [];
        for (const sessionId of sessionIds) {
            const sessionData = await this.redisService.get(`sessions:${sessionId}`);
            if (sessionData) {
                const session = JSON.parse(sessionData);
                userSessions.push({ ...session, id: sessionId });
            }
            else {
                await this.redisService.srem(`user:sessions:${userId}`, sessionId);
            }
        }
        userSessions.sort((a, b) => b.createdAt - a.createdAt);
        return userSessions.map(session => (session.id === sessionId ? { ...session, current: true } : session));
    }
    async clear(req, ip) {
        req.res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
        return { result: true };
    }
    async remove(request) {
        const { session, params } = request;
        const currentSessionId = request.session.id;
        const paramsSessionId = params.sessionId;
        if (!paramsSessionId)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.SESSION_NOT_PARAMS_ID, 'Для удаления сеансов необходимо указать sessionID');
        if (currentSessionId === paramsSessionId)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.SESSION_CURRENT_REMOVE, 'Вы не можете удалить текущий сеанс');
        await this.redisService.del(`${this.configService.getOrThrow('SESSION_FOLDER')}${paramsSessionId}`);
        this.redisService.srem(`user:sessions:${session.userId}`, paramsSessionId);
        return { result: true };
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService,
        redis_service_1.RedisService])
], SessionService);
//# sourceMappingURL=session.service.js.map