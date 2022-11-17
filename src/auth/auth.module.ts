import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[
  ConfigModule.forRoot(), PassportModule, UsersModule,
  JwtModule.register({
    privateKey: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn:'1d'},
  }),
],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
