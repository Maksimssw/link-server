import { PrismaService } from '@/src/repositories/prisma/prisma.service';
import { CreateLinkInput } from '@/src/modules/link/input/create.input';
import { Link } from '@prisma/client';
export declare class LinkRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(input: CreateLinkInput, userId: string): Promise<Link | null>;
    deleteById(id: string): Promise<Link | null>;
    getByUrl(url: string, userId: string): Promise<Link | null>;
    findByAlias(alias: string): Promise<Link | null>;
    findByUserId(userId: string): Promise<Link[] | null>;
}
