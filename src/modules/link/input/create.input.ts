import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsDate,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer'

export class CreateLinkInput {
  @IsString()
  @IsNotEmpty({ message: 'Original URL is required' })
  @IsUrl({}, { message: 'Invalid URL format' })
  public originalUrl: string;

  @IsOptional()
  @IsDate({ message: 'ExpiresAt must be a valid date' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  public expiresAt: Date;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Alias must not exceed 20 characters' })
  @ValidateIf((obj) => obj.alias !== undefined)
  public alias: string;
}