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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const link_repositiry_1 = require("../../repositories/prisma/link.repositiry");
const error_enum_1 = require("../../shared/enum/error.enum");
const appError_util_1 = require("../../shared/utils/appError.util");
const alias_service_1 = require("../helpers/alias/alias.service");
const metadata_util_1 = require("../../shared/utils/metadata.util");
const link_analytics_repository_1 = require("../../repositories/prisma/link-analytics.repository");
let LinkService = class LinkService {
    constructor(linkRepository, linkAnalyticsRepositoryRepository, aliasService) {
        this.linkRepository = linkRepository;
        this.linkAnalyticsRepositoryRepository = linkAnalyticsRepositoryRepository;
        this.aliasService = aliasService;
    }
    async create(input, user) {
        const isExistUrl = await this.linkRepository.getByUrl(input.originalUrl, user.id);
        if (isExistUrl)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.URL_EXIST, 'Url-адрес уже существует');
        await this.aliasService.isExist(input.alias);
        input.alias = input.alias ? input.alias : await this.aliasService.generateUnique();
        return this.linkRepository.create(input, user.id);
    }
    async findByAlias(alias) {
        const result = await this.linkRepository.findByAlias(alias);
        if (!result)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.ALIAS_NOT_EXIST, 'Псевдоним не найден', common_1.HttpStatus.NOT_FOUND);
        return result;
    }
    async findByUser(userId) {
        const links = await this.linkRepository.findByUserId(userId);
        if (!links)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.LINKS_NOT_FOUND, 'Не удалось получить ссылки по userId');
        return links;
    }
    async deleteByAlias(alias) {
        const link = await this.aliasService.check(alias);
        await this.linkRepository.deleteById(link.id);
        return { result: true };
    }
    async redirectUrl(response, alias, ip, userAgent) {
        const link = await this.aliasService.check(alias);
        if (link.expiresAt && new Date() >= new Date(link.expiresAt)) {
            await this.linkRepository.deleteById(link.id);
            throw new common_1.NotFoundException('Ссылка истекла');
        }
        const metadata = (0, metadata_util_1.getMetadata)(ip, userAgent);
        await this.linkAnalyticsRepositoryRepository.create(metadata, link.id);
        response.redirect(link.originalUrl);
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [link_repositiry_1.LinkRepository,
        link_analytics_repository_1.LinkAnalyticsRepositoryRepository,
        alias_service_1.AliasService])
], LinkService);
//# sourceMappingURL=link.service.js.map