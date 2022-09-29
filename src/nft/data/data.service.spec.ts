import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  const _tokenAddr = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
  const _tokenId = '8307';
  const _eth = 'eth';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('nftData', () => {
    it('return object', async () => {
      const _result = await service.nftData(_tokenAddr, _tokenId, _eth);

      expect(_result).toBeInstanceOf(Object);
      expect(_result).toHaveProperty('chain', 'Ethereum');
      expect(_result).toHaveProperty('symbol', 'eth');
      expect(_result).toHaveProperty('result');
    });

    describe('should throw a BadRequestException', () => {
      it('Invalid token address', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _invalidTokenAddr = await service.nftData('aa', _tokenId, _eth);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual('Invalid address provided');
        }
      });

      it('Empty token address', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _emptyTokenAddr = await service.nftData('', _tokenId, _eth);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual('Invalid address provided');
        }
      });

      it('Invalid token ID', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _invalidTokenId = await service.nftData(_tokenAddr, 'aa', _eth);
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
        }
      });
    });
  });
});
