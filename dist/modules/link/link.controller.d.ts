import { LinkService } from './link.service';
import { Link, User } from '@prisma/client';
import { CreateLinkInput } from '@/src/modules/link/input/create.input';
import { ResultBoolean } from '@/src/shared/types/response.type';
import type { Response } from 'express';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    create(input: CreateLinkInput, user: User): Promise<Link>;
    getByAlias(alias: string): Promise<Link>;
    getByUser(user: User): Promise<Link[]>;
    deleteByAlias(alias: string): Promise<ResultBoolean>;
    redirect(res: Response, alias: string, ip: string, userAgent: string): Promise<void>;
}
