import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { LinkRepository } from '@/src/repositories/prisma/link.repositiry'
import { Link, User } from '@prisma/client'
import { CreateLinkInput } from '@/src/modules/link/input/create.input'
import { ErrorStatus } from '@/src/shared/enum/error.enum'
import { AppError } from '@/src/shared/utils/appError.util'
import { ResultBoolean } from '@/src/shared/types/response.type'
import { AliasService } from '@/src/modules/helpers/alias/alias.service'
import { getMetadata } from '@/src/shared/utils/metadata.util'
import { LinkAnalyticsRepositoryRepository } from '@/src/repositories/prisma/link-analytics.repository'
import type { Response } from 'express'

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly linkAnalyticsRepositoryRepository: LinkAnalyticsRepositoryRepository,
    private readonly aliasService: AliasService
  ) {}

  public async create(input: CreateLinkInput, user: User): Promise<Link> {
    const isExistUrl = await this.linkRepository.getByUrl(input.originalUrl, user.id)

    if (isExistUrl) throw new AppError(ErrorStatus.URL_EXIST, 'Url-адрес уже существует')

    await this.aliasService.isExist(input.alias)

    input.alias = input.alias ? input.alias : await this.aliasService.generateUnique()

    return this.linkRepository.create(input, user.id)
  }

  public async findByAlias(alias: string): Promise<Link> {
    const result = await this.linkRepository.findByAlias(alias)

    if (!result) throw new AppError(ErrorStatus.ALIAS_NOT_EXIST, 'Псевдоним не найден', HttpStatus.NOT_FOUND)

    return result
  }

  public async findByUser(userId: string): Promise<Link[]> {
    const links = await this.linkRepository.findByUserId(userId)

    if (!links) throw new AppError(ErrorStatus.LINKS_NOT_FOUND, 'Не удалось получить ссылки по userId')

    return links
  }

  public async deleteByAlias(alias: string): Promise<ResultBoolean> {
    const link = await this.aliasService.check(alias)

    await this.linkRepository.deleteById(link.id)

    return { result: true }
  }

  public async redirectUrl(response: Response, alias: string, ip: string, userAgent: string): Promise<void> {
    const link = await this.aliasService.check(alias)

    if (link.expiresAt && new Date() >= new Date(link.expiresAt)) {
      await this.linkRepository.deleteById(link.id);
      throw new NotFoundException('Ссылка истекла');
    }

    const metadata = getMetadata(ip, userAgent)
    await this.linkAnalyticsRepositoryRepository.create(metadata, link.id)

    response.redirect(link.originalUrl)
  }
}
