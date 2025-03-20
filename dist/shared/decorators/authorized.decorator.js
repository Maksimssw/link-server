"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = void 0;
const common_1 = require("@nestjs/common");
exports.Authorized = (0, common_1.createParamDecorator)((data, ctx) => {
    const user = ctx.switchToHttp().getRequest().user;
    delete user.password;
    return data ? user[data] : user;
});
//# sourceMappingURL=authorized.decorator.js.map