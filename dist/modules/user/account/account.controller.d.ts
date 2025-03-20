import type { Request } from 'express';
import { AccountService } from '@/src/modules/user/account/account.service';
import { CreateUserInput } from '@/src/modules/user/account/input/create.input';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { ChangePasswordInput } from '@/src/modules/user/account/input/change-password.input';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(input: CreateUserInput): Promise<ResultBoolean>;
    changePassword(request: Request, body: ChangePasswordInput): Promise<ResultBoolean>;
}
