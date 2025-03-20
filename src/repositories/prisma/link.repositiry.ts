import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/repositories/prisma/prisma.service';
import { CreateLinkInput } from '@/src/modules/link/input/create.input'
import { Link } from '@prisma/client';

@Injectable()
export class LinkRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(input: CreateLinkInput, userId: string): Promise<Link | null> {
    return this.prismaService.link.create({
      data: {
        userId,
        ...input
      }
    })
  }

  public async deleteById(id: string): Promise<Link | null> {
    return this.prismaService.link.delete({
      where: {id}
    })
  }

  public async getByUrl(url: string, userId: string): Promise<Link | null> {
    return this.prismaService.link.findFirst({
      where: {userId, originalUrl: url}
    })
  }

  public async findByAlias(alias: string): Promise<Link | null> {
    return this.prismaService.link.findUnique({where: {alias: alias}})
  }

  public async findByUserId(userId: string): Promise<Link[] | null> {
    return this.prismaService.link.findMany({
      where: {userId},
      orderBy: { createAt: 'desc' }
    })
  }
}