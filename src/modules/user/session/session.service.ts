import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'
import { UserRepository } from '@/src/repositories/prisma/user.repository';
import { RedisService } from '@/src/core/redis/redis.service';
import { destroySession, saveSession, UserSession } from '@/src/shared/utils/session.util';
import { LoginInput } from '@/src/modules/user/session/input/login.input';
import { ErrorStatus } from '@/src/shared/enum/error.enum';
import { AppError } from '@/src/shared/utils/appError.util';
import { getMetadata } from '@/src/shared/utils/metadata.util';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { SessionInfo } from '@/src/modules/user/session/types/session.type';
import { User } from '@prisma/client';

@Injectable()
export class SessionService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
	) {}

	public async login(session: UserSession, input: LoginInput, ip: string, userAgent: string): Promise<User> {
		const { login, password } = input

		const user = await this.userRepository.findByLogin(login)

		if (!user) throw new AppError(ErrorStatus.USER_NOT_EXIST, `Не удалось найти пользователя по ${login}`)

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) throw new AppError(ErrorStatus.INVALID_PASSWORD, 'Введен неверный пароль')

		const metadata = getMetadata(ip, userAgent)

		return saveSession(this.redisService, session, user, metadata)
	}

	public async logout(request: Request): Promise<ResultBoolean> {
		const { session } = request

		await destroySession(this.redisService, session)
		request.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))

		return { result: true }
	}

	public async findByUser(userId: string, sessionId: string): Promise<SessionInfo[]> {
		const sessionIds = await this.redisService.smembers(`user:sessions:${userId}`)
		const userSessions = []

		for (const sessionId of sessionIds) {
			const sessionData = await this.redisService.get(`sessions:${sessionId}`)

			if (sessionData) {
				const session = JSON.parse(sessionData)
				userSessions.push({ ...session, id: sessionId })
			} else {
				await this.redisService.srem(`user:sessions:${userId}`, sessionId)
			}
		}

		userSessions.sort((a, b) => b.createdAt - a.createdAt)

		return userSessions.map(session => (session.id === sessionId ? { ...session, current: true } : session))
	}

	public async clear(req: Request, ip: string): Promise<ResultBoolean> {
		req.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))

		return { result: true }
	}

	public async remove(request: Request): Promise<ResultBoolean> {
		const { session, params } = request
		const currentSessionId = request.session.id
		const paramsSessionId = params.sessionId

		if (!paramsSessionId)
			throw new AppError(ErrorStatus.SESSION_NOT_PARAMS_ID, 'Для удаления сеансов необходимо указать sessionID')

		if (currentSessionId === paramsSessionId)
			throw new AppError(ErrorStatus.SESSION_CURRENT_REMOVE, 'Вы не можете удалить текущий сеанс')

		await this.redisService.del(`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${paramsSessionId}`)
		this.redisService.srem(`user:sessions:${session.userId}`, paramsSessionId)

		return { result: true }
	}
}
