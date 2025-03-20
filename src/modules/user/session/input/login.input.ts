import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class LoginInput {
	@IsString()
	@IsNotEmpty()
	public login: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string

	@IsOptional()
	@IsString()
	public pin?: string
}
