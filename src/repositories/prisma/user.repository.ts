import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from '../../modules/user/account/input/create.input';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async existing(username?: string, email?: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    })
  }

  public async findByLogin(login: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }]
      },
    })
  }

  public async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    })
  }

  public async add({ email, username, password }: CreateUserInput): Promise<User | null> {
    return this.prismaService.user.create({
      data: {
        email,
        password,
        username,
        displayName: username,
      }
    })
  }

  public async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.prismaService.user.update({
      where: { id },
      data: { ...data }
    })
  }
}
