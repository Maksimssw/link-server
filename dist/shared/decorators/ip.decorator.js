"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ip = void 0;
const common_1 = require("@nestjs/common");
const is_dev_util_1 = require("../utils/is-dev.util");
exports.Ip = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    return is_dev_util_1.IS_DEV_ENV ? '173.166.164.121' : extractIpFromRequest(request);
});
const extractIpFromRequest = (request) => {
    if (Array.isArray(request.headers['cf-connecting-ip']))
        return request.headers['cf-connecting-ip'][0];
    if (request.headers['cf-connecting-ip'])
        return request.headers['cf-connecting-ip'];
    if (typeof request.headers['x-forwarded-for'] === 'string')
        return request.headers['x-forwarded-for'].split(',')[0];
    return request.ip;
};
//# sourceMappingURL=ip.decorator.js.map