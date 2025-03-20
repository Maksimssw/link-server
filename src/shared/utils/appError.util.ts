import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorStatus } from '@/src/shared/enum/error.enum';

export class AppError extends HttpException {
	constructor(
		public readonly error: ErrorStatus,
		message: string,
		statusCode: number = HttpStatus.BAD_REQUEST
	) {
		super({ message, error, statusCode }, statusCode)
	}
}
