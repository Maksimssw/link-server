import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ChangePasswordInput {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public passwordRepeat: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public oldPassword: string
}
