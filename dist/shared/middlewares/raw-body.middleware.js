"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawBodyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const getRawBody = require("raw-body");
let RawBodyMiddleware = class RawBodyMiddleware {
    use(req, res, next) {
        if (!req.readable)
            return next(new common_1.BadRequestException('Invalid data from the request'));
        getRawBody(req, { encoding: 'utf-8' })
            .then(rawBody => {
            req.body = rawBody;
            next();
        })
            .catch(error => {
            throw new common_1.BadRequestException('Error on receipt: ', error);
        });
    }
};
exports.RawBodyMiddleware = RawBodyMiddleware;
exports.RawBodyMiddleware = RawBodyMiddleware = __decorate([
    (0, common_1.Injectable)()
], RawBodyMiddleware);
//# sourceMappingURL=raw-body.middleware.js.map