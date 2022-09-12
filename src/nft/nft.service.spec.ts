import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from './nft.service';

describe('NftService', () => {
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService],
    }).compile();

    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNFTs', () => {
    describe('should not throw a BadRequestException', () => {
      const _addr = '0x49664808c7AF1a5ce04DEc18563cd5A7cc03a73a';
      const _eth = 'eth';
      it.todo('Enter the correct argument');
      it('The cursor is undefined', async () => {
        const _cursorUndefined = await service.getNFTs(
          _addr,
          _eth,
          undefined,
          20,
        );
        expect(_cursorUndefined).toBeInstanceOf(Object);
      });
      it.todo('The limit is undefined');
      it('The cursor and limit are undefined', async () => {
        const _twoUndefined = await service.getNFTs(_addr, _eth);
        expect(_twoUndefined).toBeInstanceOf(Object);
      });
    });
    describe('should throw a BadRequestExceoption', () => {
      const _addr = '0x49664808c7AF1a5ce04DEc18563cd5A7cc03a73a';
      const _eth = 'eth';
      it('The addr is invalid address', async () => {
        try {
          const _invalidAddr = await service.getNFTs('a', _eth);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual('Invalid address provided');
        }
      });
    });
  });
});
