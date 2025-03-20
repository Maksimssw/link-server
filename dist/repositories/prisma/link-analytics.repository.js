"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkAnalyticsRepositoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let LinkAnalyticsRepositoryRepository = class LinkAnalyticsRepositoryRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(metadata, linkId) {
        const { location, device, ip } = metadata;
        return this.prismaService.linkAnalytics.create({
            data: {
                linkId,
                latidute: location.latidute,
                longitude: location.longitude,
                os: device.os,
                country: location.country,
                city: location.city,
                type: device.type,
                browser: device.browser,
                ip: ip
            }
        });
    }
    async get(linkId) {
        return this.prismaService.linkAnalytics.findMany({
            where: {
                linkId,
            },
            orderBy: { createAt: 'desc' },
        });
    }
};
exports.LinkAnalyticsRepositoryRepository = LinkAnalyticsRepositoryRepository;
exports.LinkAnalyticsRepositoryRepository = LinkAnalyticsRepositoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LinkAnalyticsRepositoryRepository);
//# sourceMappingURL=link-analytics.repository.js.map