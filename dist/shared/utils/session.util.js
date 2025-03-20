"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSession = saveSession;
exports.destroySession = destroySession;
const common_1 = require("@nestjs/common");
function saveSession(redisService, session, user, metadata) {
    return new Promise((resolve, reject) => {
        session.createdAt = new Date();
        session.userId = user.id;
        session.metadata = metadata;
        delete user.password;
        redisService.sadd(`user:sessions:${user.id}`, session.id);
        session.save(err => {
            err ? reject(new common_1.InternalServerErrorException("Couldn't save session")) : resolve(user);
        });
    });
}
function destroySession(redisService, session) {
    return new Promise((resolve, reject) => {
        session.destroy(err => {
            if (err)
                reject(new common_1.InternalServerErrorException("Couldn't end session"));
            redisService.srem(`user:sessions:${session.userId}`, session.id);
            resolve(true);
        });
    });
}
//# sourceMappingURL=session.util.js.map