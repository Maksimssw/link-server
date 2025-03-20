"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const is_dev_util_1 = require("../shared/utils/is-dev.util");
const prisma_module_1 = require("../repositories/prisma/prisma.module");
const redis_module_1 = require("./redis/redis.module");
const account_module_1 = require("../modules/user/account/account.module");
const session_module_1 = require("../modules/user/session/session.module");
const link_module_1 = require("../modules/link/link.module");
const alias_module_1 = require("../modules/helpers/alias/alias.module");
const analytics_module_1 = require("../modules/link/analytics/analytics.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ ignoreEnvFile: !is_dev_util_1.IS_DEV_ENV, isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            account_module_1.AccountModule,
            session_module_1.SessionModule,
            alias_module_1.AliasModule,
            link_module_1.LinkModule,
            analytics_module_1.AnalyticsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map