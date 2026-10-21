import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/token (POST) с неверными данными', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ username: 'admin', password: 'wrong' })
      .expect(401);
  });

  it('/create/plates (GET) без токена', () => {
    return request(app.getHttpServer()).get('/create/plates').expect(401);
  });
});
