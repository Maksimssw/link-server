import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import type { Request } from 'express'
import { AccountService } from '@/src/modules/user/account/account.service';
import { ThrottlerDefault } from '@/src/core/config/throttler.config';
import { CreateUserInput } from '@/src/modules/user/account/input/create.input';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { ChangePasswordInput } from '@/src/modules/user/account/input/change-password.input';

@UseGuards(ThrottlerGuard)
@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('create')
	@Throttle({ default: ThrottlerDefault.medium })
	public create(@Body() input: CreateUserInput): Promise<ResultBoolean> {
		return this.accountService.create(input)
	}

	@Post('password/change')
	@Throttle({ default: ThrottlerDefault.medium })
	public changePassword(
		@Req() request: Request,
		@Body() body: ChangePasswordInput,
	): Promise<ResultBoolean> {
		return this.accountService.changePassword(body, request.session.userId)
	}
}
