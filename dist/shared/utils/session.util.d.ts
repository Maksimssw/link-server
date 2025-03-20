import { Session, SessionData } from 'express-session';
import { RedisService } from '@/src/core/redis/redis.service';
import type { Metadata } from '../types/metadata.type';
import { User } from '@prisma/client';
export type UserSession = Session & Partial<SessionData>;
export declare function saveSession(redisService: RedisService, session: UserSession, user: User, metadata: Metadata): Promise<User>;
export declare function destroySession(redisService: RedisService, session: UserSession): Promise<boolean>;
