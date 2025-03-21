import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { IS_DEV_ENV } from '../shared/utils/is-dev.util';
import { PrismaModule } from '../repositories/prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AccountModule } from '@/src/modules/user/account/account.module';
import { SessionModule } from '@/src/modules/user/session/session.module';
import { LinkModule } from '@/src/modules/link/link.module'
import { AliasModule } from '@/src/modules/helpers/alias/alias.module'
import { AnalyticsModule } from '@/src/modules/link/analytics/analytics.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    RedisModule,
    AccountModule,
    SessionModule,
    AliasModule,
    LinkModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class CoreModule {}
