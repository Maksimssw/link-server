import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from '@/src/repositories/prisma/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly userRepository: UserRepository) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		if (typeof request.session.userId === 'undefined') throw new UnauthorizedException('The user is not logged in')

		request.user = await this.userRepository.findById(request.session.userId)

		if (!request.user) throw new UnauthorizedException('The user is not logged in')

		return true
	}
}
