import { applyDecorators, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@/src/shared/guard/auth.guard'

export function Authorization() {
	return applyDecorators(UseGuards(AuthGuard))
}
