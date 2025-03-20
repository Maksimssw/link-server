import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ResetPasswordInput {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	public email: string
}
