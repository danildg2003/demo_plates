import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Plates } from './plates/plates.entity';
import { AppController } from './app.controller';
import { PlatesAccess } from './guard/access-token-plates';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { DatabaseEnum } from './common/enum/database-enum-plates';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forFeature([Plates]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PLATES_HOST', 'localhost'),
        port: Number(configService.get('PLATES_PORT', 5433)),
        username: configService.getOrThrow<string>('PLATES_USER'),
        password: configService.getOrThrow<string>('PLATES_PASSWORD'),
        database: configService.get<string>('PLATES_DATABASE', 'postgres'),
        schema: configService.get<string>('PLATES_SCHEMA', 'plates'),
        entities: [Plates],
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    PlatesAccess,
    AppService,
    AppRepository,
    {
      provide: DatabaseEnum.plates,
      useFactory: (dataSource: DataSource) => dataSource,
      inject: [DataSource],
    },
  ],
  exports: [AppService, AppRepository, DatabaseEnum.plates],
})
export class AppModule {}
