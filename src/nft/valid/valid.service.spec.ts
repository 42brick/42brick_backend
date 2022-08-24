import { Test, TestingModule } from '@nestjs/testing';
import { ValidService } from './valid.service';

describe('ValidService', () => {
  let service: ValidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidService],
    }).compile();

    service = module.get<ValidService>(ValidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
