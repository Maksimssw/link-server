import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

export class CreateUserInput {
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
	public username: string

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string
}
