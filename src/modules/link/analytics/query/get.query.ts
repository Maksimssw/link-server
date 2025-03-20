import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer'

export class GetAnalyticsQuery {
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Transform(({ value }) => (value ? parseInt(value, 10) : undefined), { toClassOnly: true })
	skip?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Transform(({ value }) => (value ? parseInt(value, 10) : undefined), { toClassOnly: true })
	take?: number;
}