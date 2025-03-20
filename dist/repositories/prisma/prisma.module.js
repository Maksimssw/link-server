"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const user_repository_1 = require("./user.repository");
const link_repositiry_1 = require("./link.repositiry");
const alias_module_1 = require("../../modules/helpers/alias/alias.module");
const link_analytics_repository_1 = require("./link-analytics.repository");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService, user_repository_1.UserRepository, link_repositiry_1.LinkRepository, link_analytics_repository_1.LinkAnalyticsRepositoryRepository],
        exports: [prisma_service_1.PrismaService, user_repository_1.UserRepository, link_repositiry_1.LinkRepository, link_analytics_repository_1.LinkAnalyticsRepositoryRepository],
        imports: [alias_module_1.AliasModule],
    })
], PrismaModule);
//# sourceMappingURL=prisma.module.js.map