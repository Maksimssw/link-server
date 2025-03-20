import { CreateLinkInput } from '@/src/modules/link/input/create.input'
import { IsString } from 'class-validator'

export class UpdateLinkInput extends CreateLinkInput {
	@IsString()
	public id: string;
}
