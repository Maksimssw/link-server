export function parseBoolean(value: string): boolean {
	if (typeof value === 'boolean') return value
	if (typeof value === 'string') return value.trim().toLowerCase() === 'true'

	throw new Error(`The value of "${value}" could not be converted to a boolean value.`)
}
