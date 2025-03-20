import { Cookie } from 'express-session';
import { Metadata } from '@/src/shared/types/metadata.type';
export interface SessionInfo {
    metadata: Metadata;
    userId: string;
    createdAt: Date;
    cookie: Cookie;
}
