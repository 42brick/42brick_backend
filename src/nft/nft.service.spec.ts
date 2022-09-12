import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from './nft.service';

describe('NftService', () => {
  let service: NftService;

  const _addr = '0xe73185A8Afa703a034D5A5fE038BB763fcAEB5F3';
  const _eth = 'eth';

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
      it('The cursor is undefined', async () => {
        const _cursorUndefined = await service.getNFTs(
          _addr,
          _eth,
          undefined,
          20,
        );

        expect(_cursorUndefined).toBeInstanceOf(Object);
        expect(_cursorUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_cursorUndefined).toHaveProperty('symbol', 'eth');
        expect(_cursorUndefined).toHaveProperty('result');
        expect(_cursorUndefined.result.page).toEqual(1);
        expect(_cursorUndefined.result.page_size).toEqual(20);
      });

      it('The limit is undefined', async () => {
        const _getCursor = await service.getNFTs(_addr, _eth, undefined, 20);
        const _limitUndefined = await service.getNFTs(
          _addr,
          _eth,
          _getCursor.result.cursor,
        );

        expect(_limitUndefined).toBeInstanceOf(Object);
        expect(_limitUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_limitUndefined).toHaveProperty('symbol', 'eth');
        expect(_limitUndefined).toHaveProperty('result');
        expect(_limitUndefined.result.page).toEqual(2);
        expect(_limitUndefined.result.page_size).toEqual(20);
      });

      it('Enter the correct argument', async () => {
        const _getCursor = await service.getNFTs(_addr, _eth, undefined, 20);
        const _allArguments = await service.getNFTs(
          _addr,
          _eth,
          _getCursor.result.cursor,
          20,
        );

        expect(_allArguments).toBeInstanceOf(Object);
        expect(_allArguments).toHaveProperty('chain', 'Ethereum');
        expect(_allArguments).toHaveProperty('symbol', 'eth');
        expect(_allArguments).toHaveProperty('result');
        expect(_allArguments.result.page).toEqual(2);
        expect(_allArguments.result.page_size).toEqual(20);
      });

      it('The cursor and limit are undefined', async () => {
        const _twoUndefined = await service.getNFTs(_addr, _eth);

        expect(_twoUndefined).toBeInstanceOf(Object);
        expect(_twoUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_twoUndefined).toHaveProperty('symbol', 'eth');
        expect(_twoUndefined).toHaveProperty('result');
        expect(_twoUndefined.result.page).toEqual(1);
        expect(_twoUndefined.result.page_size).toEqual(100);
      });
    });

    describe('should throw a BadRequestExceoption', () => {
      it('The addr is invalid address', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _invalidAddr = await service.getNFTs('a', _eth);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual('Invalid address provided');
        }
      });
    });
  });
});
