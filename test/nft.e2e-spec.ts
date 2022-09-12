import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NftModule } from 'src/nft/nft.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NftModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/nft', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  afterAll(async () => {
    await app.close();
  });
});
