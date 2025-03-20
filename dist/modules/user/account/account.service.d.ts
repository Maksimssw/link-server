import { UserRepository } from '@/src/repositories/prisma/user.repository';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { CreateUserInput } from '@/src/modules/user/account/input/create.input';
import { ChangePasswordInput } from '@/src/modules/user/account/input/change-password.input';
export declare class AccountService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(input: CreateUserInput): Promise<ResultBoolean>;
    changePassword(input: ChangePasswordInput, userId: string): Promise<ResultBoolean>;
}
