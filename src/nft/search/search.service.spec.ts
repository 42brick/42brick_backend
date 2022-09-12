import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  const _keyword = 'hello';
  const _eth = 'eth';
  const _filter = 'name';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchNFTs', () => {
    describe('should not throw a BadRequestException', () => {
      it('The keyword and symbol is only', async () => {
        const _keywordSymbolOnly = await service.searchNFTs(_keyword, _eth);

        expect(_keywordSymbolOnly).toBeInstanceOf(Object);
        expect(_keywordSymbolOnly).toHaveProperty('chain', 'Ethereum');
        expect(_keywordSymbolOnly).toHaveProperty('symbol', 'eth');
        expect(_keywordSymbolOnly).toHaveProperty('result');
        expect(_keywordSymbolOnly.result.page).toEqual(0);
        expect(_keywordSymbolOnly.result.page_size).toEqual(100);
      });

      it('The cursor and limit are undefined', async () => {
        const _noCursorLimit = await service.searchNFTs(
          _keyword,
          _eth,
          _filter,
        );

        expect(_noCursorLimit).toBeInstanceOf(Object);
        expect(_noCursorLimit).toHaveProperty('chain', 'Ethereum');
        expect(_noCursorLimit).toHaveProperty('symbol', 'eth');
        expect(_noCursorLimit).toHaveProperty('result');
        expect(_noCursorLimit.result.page).toEqual(0);
        expect(_noCursorLimit.result.page_size).toEqual(100);
      });

      it('The filter and limit are undefined', async () => {
        const _getcursor = await service.searchNFTs(_keyword, _eth);
        const _noFilterLimit = await service.searchNFTs(
          _keyword,
          _eth,
          undefined,
          _getcursor.result.cursor,
          undefined,
        );

        expect(_noFilterLimit).toBeInstanceOf(Object);
        expect(_noFilterLimit).toHaveProperty('chain', 'Ethereum');
        expect(_noFilterLimit).toHaveProperty('symbol', 'eth');
        expect(_noFilterLimit).toHaveProperty('result');
        expect(_noFilterLimit.result.page).toEqual(1);
        expect(_noFilterLimit.result.page_size).toEqual(100);
      });

      it('The filter and cursor are undefined', async () => {
        const _noFilterCursor = await service.searchNFTs(
          _keyword,
          _eth,
          undefined,
          undefined,
          20,
        );

        expect(_noFilterCursor).toBeInstanceOf(Object);
        expect(_noFilterCursor).toHaveProperty('chain', 'Ethereum');
        expect(_noFilterCursor).toHaveProperty('symbol', 'eth');
        expect(_noFilterCursor).toHaveProperty('result');
        expect(_noFilterCursor.result.page).toEqual(0);
        expect(_noFilterCursor.result.page_size).toEqual(20);
      });

      it('The filter is undefined', async () => {
        const _getcursor = await service.searchNFTs(
          _keyword,
          _eth,
          undefined,
          undefined,
          20,
        );
        const _filterUndefined = await service.searchNFTs(
          _keyword,
          _eth,
          undefined,
          _getcursor.result.cursor,
          20,
        );

        expect(_filterUndefined).toBeInstanceOf(Object);
        expect(_filterUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_filterUndefined).toHaveProperty('symbol', 'eth');
        expect(_filterUndefined).toHaveProperty('result');
        expect(_filterUndefined.result.page).toEqual(1);
        expect(_filterUndefined.result.page_size).toEqual(20);
      });

      it('The cursor is undefined', async () => {
        const _cursorUndefined = await service.searchNFTs(
          _keyword,
          _eth,
          _filter,
          undefined,
          20,
        );

        expect(_cursorUndefined).toBeInstanceOf(Object);
        expect(_cursorUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_cursorUndefined).toHaveProperty('symbol', 'eth');
        expect(_cursorUndefined).toHaveProperty('result');
        expect(_cursorUndefined.result.page).toEqual(0);
        expect(_cursorUndefined.result.page_size).toEqual(20);
      });

      it('The limit is undefined', async () => {
        const _getcursor = await service.searchNFTs(_keyword, _eth, _filter);
        const _filterUndefined = await service.searchNFTs(
          _keyword,
          _eth,
          _filter,
          _getcursor.result.cursor,
        );

        expect(_filterUndefined).toBeInstanceOf(Object);
        expect(_filterUndefined).toHaveProperty('chain', 'Ethereum');
        expect(_filterUndefined).toHaveProperty('symbol', 'eth');
        expect(_filterUndefined).toHaveProperty('result');
        expect(_filterUndefined.result.page).toEqual(0);
        expect(_filterUndefined.result.page_size).toEqual(20);
      });
    });

    describe('should throw a BadRequestExceoption', () => {
      it('The keyword length is below than 3', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _keywordBelow3 = await service.searchNFTs('a', _eth, _filter);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
        }
      });

      it('The keyword lengeh is bigger than 256', async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _keywordBigger256 = await service.searchNFTs(
            'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
            _eth,
            _filter,
          );
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });

  describe('searchAllNFTs', () => {
    describe('should not throw a BadRequestException', () => {
      it('The keyword is only', async () => {
        const _keywordOnly = await service.searchAllNFTs(_keyword);

        expect(_keywordOnly).toBeInstanceOf(Object);
        expect(_keywordOnly).toHaveProperty('Ethereum');
        expect(_keywordOnly.Ethereum).toHaveProperty('chain', 'Ethereum');
        expect(_keywordOnly.Ethereum).toHaveProperty('symbol', 'eth');
        expect(_keywordOnly.Ethereum).toHaveProperty('result');
        expect(_keywordOnly.Ethereum.result.page).toEqual(0);
        expect(_keywordOnly.Ethereum.result.page_size).toEqual(100);
        expect(_keywordOnly).toHaveProperty('BSC');
        expect(_keywordOnly.Ethereum).toHaveProperty(
          'chain',
          'Binance Smart Chain',
        );
        expect(_keywordOnly.Ethereum).toHaveProperty('symbol', 'bsc');
        expect(_keywordOnly.Ethereum).toHaveProperty('result');
        expect(_keywordOnly.Ethereum.result.page).toEqual(0);
        expect(_keywordOnly.Ethereum.result.page_size).toEqual(100);
        expect(_keywordOnly).toHaveProperty('Polygon');
        expect(_keywordOnly.Ethereum).toHaveProperty('chain', 'Polygon');
        expect(_keywordOnly.Ethereum).toHaveProperty('symbol', 'matic');
        expect(_keywordOnly.Ethereum).toHaveProperty('result');
        expect(_keywordOnly.Ethereum.result.page).toEqual(0);
        expect(_keywordOnly.Ethereum.result.page_size).toEqual(100);
        expect(_keywordOnly).toHaveProperty('Fantom');
        expect(_keywordOnly.Ethereum).toHaveProperty('chain', 'Fantom');
        expect(_keywordOnly.Ethereum).toHaveProperty('symbol', 'ftm');
        expect(_keywordOnly.Ethereum).toHaveProperty('result');
        expect(_keywordOnly.Ethereum.result.page).toEqual(0);
        expect(_keywordOnly.Ethereum.result.page_size).toEqual(100);
      });

      it.todo('The cursor and limit are undefined');

      //   it('The filter and limit are undefined', async () => {
      //     const _getcursor = await service.searchAllNFTs(_keyword, _eth);
      //     const _noFilterLimit = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       undefined,
      //       _getcursor.result.cursor,
      //       undefined,
      //     );

      //     expect(_noFilterLimit).toBeInstanceOf(Object);
      //     expect(_noFilterLimit).toHaveProperty('chain', 'Ethereum');
      //     expect(_noFilterLimit).toHaveProperty('symbol', 'eth');
      //     expect(_noFilterLimit).toHaveProperty('result');
      //     expect(_noFilterLimit.result.page).toEqual(1);
      //     expect(_noFilterLimit.result.page_size).toEqual(100);
      //   });

      //   it('The filter and cursor are undefined', async () => {
      //     const _noFilterCursor = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       undefined,
      //       undefined,
      //       20,
      //     );

      //     expect(_noFilterCursor).toBeInstanceOf(Object);
      //     expect(_noFilterCursor).toHaveProperty('chain', 'Ethereum');
      //     expect(_noFilterCursor).toHaveProperty('symbol', 'eth');
      //     expect(_noFilterCursor).toHaveProperty('result');
      //     expect(_noFilterCursor.result.page).toEqual(0);
      //     expect(_noFilterCursor.result.page_size).toEqual(20);
      //   });

      //   it('The filter is undefined', async () => {
      //     const _getcursor = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       undefined,
      //       undefined,
      //       20,
      //     );
      //     const _filterUndefined = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       undefined,
      //       _getcursor.result.cursor,
      //       20,
      //     );

      //     expect(_filterUndefined).toBeInstanceOf(Object);
      //     expect(_filterUndefined).toHaveProperty('chain', 'Ethereum');
      //     expect(_filterUndefined).toHaveProperty('symbol', 'eth');
      //     expect(_filterUndefined).toHaveProperty('result');
      //     expect(_filterUndefined.result.page).toEqual(1);
      //     expect(_filterUndefined.result.page_size).toEqual(20);
      //   });

      //   it('The cursor is undefined', async () => {
      //     const _cursorUndefined = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       _filter,
      //       undefined,
      //       20,
      //     );

      //     expect(_cursorUndefined).toBeInstanceOf(Object);
      //     expect(_cursorUndefined).toHaveProperty('chain', 'Ethereum');
      //     expect(_cursorUndefined).toHaveProperty('symbol', 'eth');
      //     expect(_cursorUndefined).toHaveProperty('result');
      //     expect(_cursorUndefined.result.page).toEqual(0);
      //     expect(_cursorUndefined.result.page_size).toEqual(20);
      //   });

      //   it('The limit is undefined', async () => {
      //     const _getcursor = await service.searchAllNFTs(_keyword, _eth, _filter);
      //     const _filterUndefined = await service.searchAllNFTs(
      //       _keyword,
      //       _eth,
      //       _filter,
      //       _getcursor.result.cursor,
      //     );

      //     expect(_filterUndefined).toBeInstanceOf(Object);
      //     expect(_filterUndefined).toHaveProperty('chain', 'Ethereum');
      //     expect(_filterUndefined).toHaveProperty('symbol', 'eth');
      //     expect(_filterUndefined).toHaveProperty('result');
      //     expect(_filterUndefined.result.page).toEqual(0);
      //     expect(_filterUndefined.result.page_size).toEqual(20);
      //   });
      // });

      // describe('should throw a BadRequestExceoption', () => {
      //   it('The keyword length is below than 3', async () => {
      //     try {
      //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //       const _keywordBelow3 = await service.searchAllNFTs('a', _eth, _filter);
      //     } catch (e) {
      //       expect(e).toBeInstanceOf(BadRequestException);
      //     }
      //   });

      //   it('The keyword lengeh is bigger than 256', async () => {
      //     try {
      //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //       const _keywordBigger256 = await service.searchAllNFTs(
      //         'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
      //         _eth,
      //         _filter,
      //       );
      //     } catch (e) {
      //       expect(e).toBeInstanceOf(BadRequestException);
      //     }
      // });
    });
  });
});
