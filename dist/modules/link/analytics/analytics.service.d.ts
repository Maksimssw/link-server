import { LinkAnalyticsRepositoryRepository } from '@/src/repositories/prisma/link-analytics.repository';
import { AliasService } from '@/src/modules/helpers/alias/alias.service';
import { LinkAnalytics } from '@prisma/client';
export declare class AnalyticsService {
    private readonly linkAnalyticsRepository;
    private readonly aliasService;
    constructor(linkAnalyticsRepository: LinkAnalyticsRepositoryRepository, aliasService: AliasService);
    get(alias: string): Promise<LinkAnalytics[]>;
}
