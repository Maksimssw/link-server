import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AliasModule } from '@/src/modules/helpers/alias/alias.module'

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [AliasModule],
})
export class AnalyticsModule {}
