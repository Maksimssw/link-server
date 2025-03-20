import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { UserRepository } from '@/src/repositories/prisma/user.repository';
import { LinkRepository } from '@/src/repositories/prisma/link.repositiry'
import { AliasModule } from '@/src/modules/helpers/alias/alias.module'
import { LinkAnalyticsRepositoryRepository } from '@/src/repositories/prisma/link-analytics.repository'

@Global()
@Module({
	providers: [PrismaService, UserRepository, LinkRepository, LinkAnalyticsRepositoryRepository],
	exports: [PrismaService, UserRepository, LinkRepository, LinkAnalyticsRepositoryRepository],
	imports: [AliasModule],
})
export class PrismaModule {}
