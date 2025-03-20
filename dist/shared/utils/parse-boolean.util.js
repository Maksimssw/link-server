"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = parseBoolean;
function parseBoolean(value) {
    if (typeof value === 'boolean')
        return value;
    if (typeof value === 'string')
        return value.trim().toLowerCase() === 'true';
    throw new Error(`The value of "${value}" could not be converted to a boolean value.`);
}
//# sourceMappingURL=parse-boolean.util.js.map