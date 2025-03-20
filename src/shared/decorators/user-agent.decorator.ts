import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export const UserAgent = createParamDecorator((_, ctx: ExecutionContext): string => {
	const request = ctx.switchToHttp().getRequest() as Request
	return request.headers['user-agent']
})
