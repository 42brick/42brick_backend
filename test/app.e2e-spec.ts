import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to 42brick API');
  });

  describe('/nft', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  describe('/nft/data', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  describe('/nft/search', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  describe('/nft/search/all', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  afterAll(async () => {
    await app.close();
  });
});
