import 'express-session'

import type { Metadata } from './metadata.type'

declare module 'express-session' {
	interface SessionData extends Session {
		userId?: string
		createdAt?: Date | string
		metadata: Metadata
	}
}
