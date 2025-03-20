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
exports.AliasService = void 0;
const common_1 = require("@nestjs/common");
const link_repositiry_1 = require("../../../repositories/prisma/link.repositiry");
const nanoid_1 = require("nanoid");
const config_1 = require("@nestjs/config");
const appError_util_1 = require("../../../shared/utils/appError.util");
const error_enum_1 = require("../../../shared/enum/error.enum");
let AliasService = class AliasService {
    constructor(linkRepository, configService) {
        this.linkRepository = linkRepository;
        this.configService = configService;
        this.ALPHABET = this.configService.getOrThrow('ALPHABET');
        this.ALIAS_LENGTH = this.configService.getOrThrow('ALIAS_LENGTH');
    }
    async isExist(alias) {
        if (alias) {
            const isExistAlias = await this.linkRepository.findByAlias(alias);
            if (isExistAlias)
                throw new appError_util_1.AppError(error_enum_1.ErrorStatus.ALIAS_EXIST, 'Алиас уже существует');
        }
    }
    async check(alias) {
        if (!alias)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.ALIAS_NOT_EXIST, 'Алиас не существует');
        const link = await this.linkRepository.findByAlias(alias);
        if (!link)
            throw new appError_util_1.AppError(error_enum_1.ErrorStatus.URL_NOT_EXIST, 'Не удалось найти ссылку', 404);
        return link;
    }
    async generateUnique() {
        const generateAlias = (0, nanoid_1.customAlphabet)(this.ALPHABET, this.ALIAS_LENGTH);
        let alias;
        let isUnique = false;
        while (!isUnique) {
            alias = generateAlias();
            const existingLink = await this.linkRepository.findByAlias(alias);
            if (!existingLink)
                isUnique = true;
        }
        return alias;
    }
};
exports.AliasService = AliasService;
exports.AliasService = AliasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [link_repositiry_1.LinkRepository, config_1.ConfigService])
], AliasService);
//# sourceMappingURL=alias.service.js.map