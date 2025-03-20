import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { AliasModule } from '@/src/modules/helpers/alias/alias.module'
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
  imports: [AliasModule, AnalyticsModule],
})
export class LinkModule {}
