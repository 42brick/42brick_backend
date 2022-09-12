import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SearchModule } from 'src/nft/search/search.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/nft/search', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });

  describe('/nft/search/all', () => {
    it.todo('GET 200');
    it.todo('GET 400');
  });
});
