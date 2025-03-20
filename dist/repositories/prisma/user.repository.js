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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let UserRepository = class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async existing(username, email) {
        return this.prismaService.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });
    }
    async findByLogin(login) {
        return this.prismaService.user.findFirst({
            where: {
                OR: [{ username: { equals: login } }, { email: { equals: login } }]
            },
        });
    }
    async findById(id) {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }
    async add({ email, username, password }) {
        return this.prismaService.user.create({
            data: {
                email,
                password,
                username,
                displayName: username,
            }
        });
    }
    async update(id, data) {
        return this.prismaService.user.update({
            where: { id },
            data: { ...data }
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map