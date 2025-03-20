import { Controller, Get, Param } from '@nestjs/common'
import { AnalyticsService } from './analytics.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { LinkAnalytics } from '@prisma/client'

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/:alias')
  @Authorization()
  public async get(
    @Param('alias') alias: string,
  ): Promise<LinkAnalytics[]> {
    return this.analyticsService.get(alias);
  }
}
