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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usersEntity_1 = require("./usersEntity");
const nodemialer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(data) {
        return await this.usersRepository.save(this.usersRepository.create(data));
    }
    async find() {
        return await this.usersRepository.find({
            select: ['id', 'firstName', 'lastName', 'email'],
        });
    }
    async findOneBy(id) {
        try {
            return this.usersRepository.findOneBy({ id });
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async update(id, data) {
        const user = await this.findOneBy(id);
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }
    async delete(id) {
        await this.findOneBy(id);
        await this.usersRepository.softDelete(id);
    }
    async findByEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async forgoPassword(email) {
        try {
            const user = await this.findByEmail(email);
            const transporter = nodemialer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "499747c9ef629e",
                    pass: "78624527ea2088"
                }
            });
            const newPassword = crypto.randomBytes(4).toString('hex');
            transporter
                .sendMail({
                from: 'Administrador <dbaef3eb5c-da7ec6@inbox.mailtrap.io>',
                to: email,
                subject: 'Recuperação de senha 3',
                html: `
        <p>Olá su anova senha para acessar o sistema é: ${newPassword}</p><br/><a href="http://localhost:3000/api/auth/login">Sistema</a>`,
            })
                .then(() => {
                bcrypt.hash(newPassword, 10).then((password) => {
                    this.usersRepository
                        .update(user[0].id, {
                        password,
                    })
                        .then(() => {
                        return { message: 'email sended' };
                    });
                });
            })
                .catch(() => {
                return {
                    message: 'fail to send email',
                };
            });
        }
        catch (error) {
            return { message: 'User not found' };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usersEntity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map