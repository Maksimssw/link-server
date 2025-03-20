import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common'
import type { Request } from 'express'

import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'
import { Ip } from '@/src/shared/decorators/ip.decorator'
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'

import { SessionService } from './session.service'
import { User } from '@prisma/client';
import { LoginInput } from '@/src/modules/user/session/input/login.input';

@Controller('session')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Get('me')
	@Authorization()
	public async me(@Authorized() user: User) {
		return user
	}

	@Post('login')
	public async login(
		@Req() request: Request,
		@Body() input: LoginInput,
		@Ip() ip: string,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.login(request.session, input, ip, userAgent)
	}

	@Get('logout')
	@Authorization()
	public async logout(@Req() request: Request) {
		return this.sessionService.logout(request)
	}

	@Get('list')
	@Authorization()
	public async findByUser(@Req() request: Request) {
		return this.sessionService.findByUser(request.session.userId, request.session.id)
	}

	@Get('clear')
	@Authorization()
	public async clear(@Req() request: Request, @Ip() ip: string) {
		return this.sessionService.clear(request, ip)
	}

	@Delete(':sessionId')
	@Authorization()
	public async remove(@Req() request: Request) {
		return this.sessionService.remove(request)
	}
}
