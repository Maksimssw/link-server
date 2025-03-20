import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/src/repositories/prisma/prisma.service'
import { Metadata } from '@/src/shared/types/metadata.type'
import { LinkAnalytics } from '@prisma/client'

@Injectable()
export class LinkAnalyticsRepositoryRepository {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(metadata: Metadata, linkId: string): Promise<LinkAnalytics> {
		const {location, device, ip} = metadata;

		return this.prismaService.linkAnalytics.create({
			data: {
				linkId,
				latidute: location.latidute,
				longitude: location.longitude,
				os: device.os,
				country: location.country,
				city: location.city,
				type: device.type,
				browser: device.browser,
				ip: ip
			}
		})
	}

	public async get(linkId: string): Promise<LinkAnalytics[]> {
		return this.prismaService.linkAnalytics.findMany({
			where: {
				linkId,
			},
			orderBy: {createAt: 'desc'},
		})
	}
}