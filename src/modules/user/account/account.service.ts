import { HttpStatus, Injectable } from '@nestjs/common'

import { hash, verify } from 'argon2'

import { UserRepository } from '@/src/repositories/prisma/user.repository';
import { ResultBoolean } from '@/src/shared/types/response.type';
import { CreateUserInput } from '@/src/modules/user/account/input/create.input';
import { ChangePasswordInput } from '@/src/modules/user/account/input/change-password.input';
import { AppError } from '@/src/shared/utils/appError.util';
import { ErrorStatus } from '@/src/shared/enum/error.enum';

@Injectable()
export class AccountService {
	constructor(private readonly userRepository: UserRepository) {}

	public async create(input: CreateUserInput): Promise<ResultBoolean> {
		const { email, username, password } = input

		const isExist = await this.userRepository.existing(username, email)

		if (isExist) {
			if (isExist.email === email)
				throw new AppError(ErrorStatus.EMAIL_EXIST, `Емайл ${email} уже существует`)

			if (isExist.username === username)
				throw new AppError(ErrorStatus.USERNAME_EXIST, `Username ${username} уже существует`)
		}

		const hashPassword = await hash(password)
		await this.userRepository.add({ ...input, password: hashPassword })

		return { result: true }
	}

	public async changePassword(input: ChangePasswordInput, userId: string): Promise<ResultBoolean> {
		const { password, oldPassword } = input

		const user = await this.userRepository.findById(userId)

		if (!user)
			throw new AppError(ErrorStatus.USER_NOT_EXIST, "Не удалось найти пользователя", HttpStatus.NOT_FOUND)

		const isValidPassword = await verify(user.password, oldPassword)

		if (!isValidPassword)	throw new AppError(ErrorStatus.INVALID_PASSWORD, 'Неверный пароль пользователя')

		await this.userRepository.update(userId, { password: await hash(password) })

		return { result: true }
	}
}
