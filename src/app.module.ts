import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Plates } from './plates/plates.entity';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { PlatesAccess } from './guard/access-token-plates';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { DatabaseEnum } from './common/enum/database-enum-plates';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forFeature([Plates]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'password',
      database: 'postgres',
      schema: 'plates',
      entities: [Plates],
      autoLoadEntities: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Получаем ключ из .env
        signOptions: { expiresIn: '1h' }, // Настройки токена
      }),
    }),
  ],
  controllers: [AuthController, AppController],
  providers: [
    PlatesAccess,
    AppService,
    AppRepository,
    {
      provide: DatabaseEnum.plates,
      useFactory: (dataSource: DataSource) => dataSource,
    },
  ],
  exports: [AppService, AppRepository, DatabaseEnum.plates, JwtModule],
})
export class AppModule {}
