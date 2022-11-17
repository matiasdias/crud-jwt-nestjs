import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './usersEntity';
import * as nodemialer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  async create(data: CreateUserDto): Promise<UsersEntity> {
    return await this.usersRepository.save(this.usersRepository.create(data));
  }

  async find() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }
  async findOneBy(id: string) {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneBy(id);

    this.usersRepository.merge(user, data);

    return await this.usersRepository.save(user);
  }
  async delete(id: string) {
    await this.findOneBy(id);

    await this.usersRepository.softDelete(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async forgoPassword(email: string) {
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
      const newPassword = crypto.randomBytes(4).toString('hex'); // gerar a senha

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
              })
              /*.catch(() => {
                return { message: 'user not found' };
              });*/
          });
        })
        .catch(() => {
          return {
            message: 'fail to send email',
          };
        });
    } catch (error) {
      return {message:'User not found'}
    }
  }
}
