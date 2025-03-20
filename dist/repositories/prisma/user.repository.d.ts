import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from '../../modules/user/account/input/create.input';
export declare class UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    existing(username?: string, email?: string): Promise<User | null>;
    findByLogin(login: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    add({ email, username, password }: CreateUserInput): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User | null>;
}
