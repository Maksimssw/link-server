import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { UserRepository } from '@/src/repositories/prisma/user.repository';
import { RedisService } from '@/src/core/redis/redis.service';
import { UserSession } from '@/src/shared/utils/session.util';
import { LoginInput } from '@/src/modules/user/session/input/login.input';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { SessionInfo } from '@/src/modules/user/session/types/session.type';
import { User } from '@prisma/client';
export declare class SessionService {
    private readonly userRepository;
    private readonly configService;
    private readonly redisService;
    constructor(userRepository: UserRepository, configService: ConfigService, redisService: RedisService);
    login(session: UserSession, input: LoginInput, ip: string, userAgent: string): Promise<User>;
    logout(request: Request): Promise<ResultBoolean>;
    findByUser(userId: string, sessionId: string): Promise<SessionInfo[]>;
    clear(req: Request, ip: string): Promise<ResultBoolean>;
    remove(request: Request): Promise<ResultBoolean>;
}
