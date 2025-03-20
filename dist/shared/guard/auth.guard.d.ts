import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRepository } from '@/src/repositories/prisma/user.repository';
export declare class AuthGuard implements CanActivate {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
