import { InternalServerErrorException } from '@nestjs/common'
import { Session, SessionData } from 'express-session'

import { RedisService } from '@/src/core/redis/redis.service'

import type { Metadata } from '../types/metadata.type'
import { User } from '@prisma/client';

export type UserSession = Session & Partial<SessionData>

export function saveSession(
	redisService: RedisService,
	session: UserSession,
	user: User,
	metadata: Metadata
): Promise<User> {
	return new Promise((resolve, reject) => {
		session.createdAt = new Date()
		session.userId = user.id
		session.metadata = metadata

		delete user.password
		redisService.sadd(`user:sessions:${user.id}`, session.id)

		session.save(err => {
			err ? reject(new InternalServerErrorException("Couldn't save session")) : resolve(user)
		})
	})
}

export function destroySession(redisService: RedisService, session: UserSession): Promise<boolean> {
	return new Promise((resolve, reject) => {
		session.destroy(err => {
			if (err) reject(new InternalServerErrorException("Couldn't end session"))

			redisService.srem(`user:sessions:${session.userId}`, session.id)

			resolve(true)
		})
	})
}
