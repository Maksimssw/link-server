import { HttpException } from '@nestjs/common';
import { ErrorStatus } from '@/src/shared/enum/error.enum';
export declare class AppError extends HttpException {
    readonly error: ErrorStatus;
    constructor(error: ErrorStatus, message: string, statusCode?: number);
}
