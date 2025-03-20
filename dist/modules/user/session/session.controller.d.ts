import type { Request } from 'express';
import { SessionService } from './session.service';
import { User } from '@prisma/client';
import { LoginInput } from '@/src/modules/user/session/input/login.input';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    me(user: User): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        displayName: string;
        createAt: Date;
        updateAt: Date;
    }>;
    login(request: Request, input: LoginInput, ip: string, userAgent: string): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        displayName: string;
        createAt: Date;
        updateAt: Date;
    }>;
    logout(request: Request): Promise<import("../../../shared/types/response.type").ResultBoolean>;
    findByUser(request: Request): Promise<import("./types/session.type").SessionInfo[]>;
    clear(request: Request, ip: string): Promise<import("../../../shared/types/response.type").ResultBoolean>;
    remove(request: Request): Promise<import("../../../shared/types/response.type").ResultBoolean>;
}
