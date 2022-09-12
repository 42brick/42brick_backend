import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataModule } from '../src/nft/data/data.module';

describe('DataController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DataModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/nft/data', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  afterAll(async () => {
    await app.close();
  });
});
