import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/usersEntity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
     type:"postgres",
     host: configService.get('DB_HOST','localhost'),
     port: Number(configService.get('DB_PORT', 5437)),
     username: configService.get('DB_USERNAME', 'postgres'),
     password: configService.get('DB_PASSWORD','23518'),
     database: configService.get('DB_DATABASE','postgres'),
     entities: [UsersEntity],
     synchronize: true,
    }),
   }), UsersModule, AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
