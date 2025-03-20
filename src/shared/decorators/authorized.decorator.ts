import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client';

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext): Promise<User> => {
	const user = ctx.switchToHttp().getRequest().user
	delete user.password

	return data ? user[data] : user
})
