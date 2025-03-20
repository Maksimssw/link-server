import { Injectable } from '@nestjs/common';
import { LinkRepository } from '@/src/repositories/prisma/link.repositiry'
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '@/src/shared/utils/appError.util'
import { ErrorStatus } from '@/src/shared/enum/error.enum'
import { Link } from '@prisma/client'

@Injectable()
export class AliasService {
	private readonly ALIAS_LENGTH: number = 6

	constructor(private readonly linkRepository: LinkRepository){}

	public async isExist(alias: string): Promise<void | never> {
		if (alias) {
			const isExistAlias = await this.linkRepository.findByAlias(alias)

			if (isExistAlias) throw new AppError(ErrorStatus.ALIAS_EXIST, 'Алиас уже существует')
		}
	}

	public async check(alias: string): Promise<Link> {
		if (!alias)
			throw new AppError(ErrorStatus.ALIAS_NOT_EXIST, 'Алиас не существует')

		const link = await this.linkRepository.findByAlias(alias)

		if (!link)
			throw new AppError(ErrorStatus.URL_NOT_EXIST, 'Не удалось найти ссылку', 404)

		return link
	}

	public async generateUnique(): Promise<string> {
		const generateAlias = uuidv4().replace(/-/g, '').substring(0, this.ALIAS_LENGTH);

		let alias: string;
		let isUnique = false;

		while (!isUnique) {
			alias = generateAlias

			const existingLink = await this.linkRepository.findByAlias(alias)

			if (!existingLink) isUnique = true
		}

		return alias
	}
}
