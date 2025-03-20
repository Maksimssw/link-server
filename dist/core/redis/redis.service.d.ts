import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisService extends Redis {
    private readonly configService;
    constructor(configService: ConfigService);
}
