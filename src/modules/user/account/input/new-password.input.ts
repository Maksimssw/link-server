import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator'

export class NewPasswordInput {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public passwordRepeat: string

	@IsUUID('4')
	@IsNotEmpty()
	public token: string
}
