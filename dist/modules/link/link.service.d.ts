import { LinkRepository } from '@/src/repositories/prisma/link.repositiry';
import { Link, User } from '@prisma/client';
import { CreateLinkInput } from '@/src/modules/link/input/create.input';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { AliasService } from '@/src/modules/helpers/alias/alias.service';
import { LinkAnalyticsRepositoryRepository } from '@/src/repositories/prisma/link-analytics.repository';
import type { Response } from 'express';
export declare class LinkService {
    private readonly linkRepository;
    private readonly linkAnalyticsRepositoryRepository;
    private readonly aliasService;
    constructor(linkRepository: LinkRepository, linkAnalyticsRepositoryRepository: LinkAnalyticsRepositoryRepository, aliasService: AliasService);
    create(input: CreateLinkInput, user: User): Promise<Link>;
    findByAlias(alias: string): Promise<Link>;
    findByUser(userId: string): Promise<Link[]>;
    deleteByAlias(alias: string): Promise<ResultBoolean>;
    redirectUrl(response: Response, alias: string, ip: string, userAgent: string): Promise<void>;
}
