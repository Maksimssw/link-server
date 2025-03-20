import { PrismaService } from '@/src/repositories/prisma/prisma.service';
import { Metadata } from '@/src/shared/types/metadata.type';
import { LinkAnalytics } from '@prisma/client';
export declare class LinkAnalyticsRepositoryRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(metadata: Metadata, linkId: string): Promise<LinkAnalytics>;
    get(linkId: string): Promise<LinkAnalytics[]>;
}
