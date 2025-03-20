import { Injectable } from '@nestjs/common';
import { LinkAnalyticsRepositoryRepository } from '@/src/repositories/prisma/link-analytics.repository'
import { AliasService } from '@/src/modules/helpers/alias/alias.service'
import { LinkAnalytics } from '@prisma/client'

@Injectable()
export class AnalyticsService {
	constructor(
		private readonly linkAnalyticsRepository: LinkAnalyticsRepositoryRepository,
		private readonly aliasService: AliasService
	) {}

	public async get(alias: string): Promise<LinkAnalytics[]> {
	  const link =	await this.aliasService.check(alias)

		return this.linkAnalyticsRepository.get(link.id)
	}
}
