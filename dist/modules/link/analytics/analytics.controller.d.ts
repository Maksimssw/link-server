import { AnalyticsService } from './analytics.service';
import { LinkAnalytics } from '@prisma/client';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    get(alias: string): Promise<LinkAnalytics[]>;
}
