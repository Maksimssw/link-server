import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { LinkService } from './link.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'
import { Link, User } from '@prisma/client'
import { CreateLinkInput } from '@/src/modules/link/input/create.input'
import { ResultBoolean } from '@/src/shared/types/response.type';
import type { Response } from 'express'
import { Ip } from '@/src/shared/decorators/ip.decorator'
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('/shorten')
  @Authorization()
  public async create(@Body() input: CreateLinkInput, @Authorized() user: User): Promise<Link> {
    return this.linkService.create(input, user)
  }

  @Get('/info/:alias')
  @Authorization()
  public async getByAlias(@Param('alias') alias: string): Promise<Link> {
    return this.linkService.findByAlias(alias)
  }

  @Get('/info/')
  @Authorization()
  public async getByUser(@Authorized() user: User): Promise<Link[]> {
    return this.linkService.findByUser(user.id)
  }

  @Delete('/:alias')
  @Authorization()
  public async deleteByAlias(@Param('alias') alias: string): Promise<ResultBoolean> {
    return this.linkService.deleteByAlias(alias)
  }

  @Get('/:alias')
  public async redirect(
    @Res() res: Response,
    @Param('alias') alias: string,
    @Ip() ip: string,
    @UserAgent() userAgent: string
  ): Promise<void> {
    await this.linkService.redirectUrl(res, alias, ip, userAgent)
  }
}
