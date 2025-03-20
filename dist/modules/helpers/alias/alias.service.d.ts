import { LinkRepository } from '@/src/repositories/prisma/link.repositiry';
import { ConfigService } from '@nestjs/config';
import { Link } from '@prisma/client';
export declare class AliasService {
    private readonly linkRepository;
    private readonly configService;
    private readonly ALPHABET;
    private readonly ALIAS_LENGTH;
    constructor(linkRepository: LinkRepository, configService: ConfigService);
    isExist(alias: string): Promise<void | never>;
    check(alias: string): Promise<Link>;
    generateUnique(): Promise<string>;
}
