"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerDefault = void 0;
exports.ThrottlerDefault = {
    short: {
        ttl: 1000,
        limit: 3
    },
    medium: {
        ttl: 10000,
        limit: 20
    },
    long: {
        ttl: 60000,
        limit: 100
    }
};
//# sourceMappingURL=throttler.config.js.map