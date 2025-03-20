import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { type Request } from 'express'

import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'

export const Ip = createParamDecorator<string>((_, context: ExecutionContext): string => {
	const request = context.switchToHttp().getRequest<Request>()

	return IS_DEV_ENV ? '173.166.164.121' : extractIpFromRequest(request)
})

const extractIpFromRequest = (request: Request): string => {
	if (Array.isArray(request.headers['cf-connecting-ip'])) return request.headers['cf-connecting-ip'][0]

	if (request.headers['cf-connecting-ip']) return request.headers['cf-connecting-ip']

	if (typeof request.headers['x-forwarded-for'] === 'string') return request.headers['x-forwarded-for'].split(',')[0]

	return request.ip
}
