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
exports.LinkRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let LinkRepository = class LinkRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(input, userId) {
        return this.prismaService.link.create({
            data: {
                userId,
                ...input
            }
        });
    }
    async deleteById(id) {
        return this.prismaService.link.delete({
            where: { id }
        });
    }
    async getByUrl(url, userId) {
        return this.prismaService.link.findFirst({
            where: { userId, originalUrl: url }
        });
    }
    async findByAlias(alias) {
        return this.prismaService.link.findUnique({ where: { alias: alias } });
    }
    async findByUserId(userId) {
        return this.prismaService.link.findMany({
            where: { userId },
            orderBy: { createAt: 'desc' }
        });
    }
};
exports.LinkRepository = LinkRepository;
exports.LinkRepository = LinkRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LinkRepository);
//# sourceMappingURL=link.repositiry.js.map