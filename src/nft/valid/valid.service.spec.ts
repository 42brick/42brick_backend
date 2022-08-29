import { BadRequestException } from '@nestjs/common';
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

  describe('is_valid_filter', () => {
    describe('should not throw a BadRequestException', () => {
      it("filter is 'name'", () => {
        expect(service.is_valid_filter('name')).toBe(void 0);
      });
      it("filter is 'description'", () => {
        expect(service.is_valid_filter('description')).toBe(void 0);
      });
      it("filter is 'attributes'", () => {
        expect(service.is_valid_filter('attributes')).toBe(void 0);
      });
      it("filter is 'global'", () => {
        expect(service.is_valid_filter('global')).toBe(void 0);
      });
      it("filter is 'name,description'", () => {
        expect(service.is_valid_filter('name,description')).toBe(void 0);
      });
      it("filter is 'name,attributes'", () => {
        expect(service.is_valid_filter('name,attributes')).toBe(void 0);
      });
      it("filter is 'description,attributes'", () => {
        expect(service.is_valid_filter('description,attributes')).toBe(void 0);
      });
      it("filter is 'name,description,attributes'", () => {
        // eslint-disable-next-line prettier/prettier
        expect(service.is_valid_filter('name,description,attributes')).toBe(void 0);
      });
    });

    describe('should throw a BadRequestException', () => {
      it("filter is 'hello'", () => {
        try {
          service.is_valid_filter('hello');
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'You cannot use this filter. Please check again. Current filter: hello',
          );
        }
      });
    });
  });

  describe('is_valid_symbol', () => {
    describe('should not throw a BadRequestException', () => {
      it("filter is 'eth'", () => {
        expect(service.is_valid_symbol('eth')).toBe(void 0);
      });
      it("filter is 'bsc'", () => {
        expect(service.is_valid_symbol('bsc')).toBe(void 0);
      });
      it("filter is 'matic'", () => {
        expect(service.is_valid_symbol('matic')).toBe(void 0);
      });
      it("filter is 'ftm'", () => {
        expect(service.is_valid_symbol('ftm')).toBe(void 0);
      });
    });

    describe('should throw a BadRequestException', () => {
      it('symbol is undefined', () => {
        try {
          service.is_valid_symbol(undefined);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'Any symbol is not inputed. Please input the symbol. Allowed symbols: eth, bsc, matic, ftm',
          );
        }
      });
      it('not allowed symbol', () => {
        try {
          service.is_valid_symbol('btc');
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'It is not allowed symbol. Please check again. Current filter: btc',
          );
        }
      });
    });
  });

  describe('is_valid_keyword', () => {
    describe('should not throw a BadRequestException', () => {
      it('keyword is hello', () => {
        expect(service.is_valid_keyword('hello')).toBe(void 0);
      });
    });
    describe('should throw a BadRequestException', () => {
      it('keyword is undefined', () => {
        try {
          service.is_valid_keyword(undefined);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'Any keyword is not inputed. Please input the keyword that its minimum length is 3 and maximum length is 256',
          );
        }
      });
      it('keyword length is less than 3', () => {
        try {
          service.is_valid_keyword('t');
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'keyword length is lower than 3. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
          );
        }
      });
      it('keyword length is more than 256', () => {
        try {
          service.is_valid_keyword(
            'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
          );
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'keyword length is bigger than 256. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
          );
        }
      });
    });
  });

  describe('is_valid_limit', () => {
    describe('should not throw a BadRequestException', () => {
      it('limit > 0', () => {
        expect(service.is_valid_limit(300)).toBe(void 0);
      });
    });
    describe('should throw a BadRequestException', () => {
      it('limit === 0', () => {
        try {
          service.is_valid_limit(0);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'limit have to bigger than 0. Please check again. Current limit: 0',
          );
        }
      });
      it('limit <= 0', () => {
        try {
          service.is_valid_limit(-100);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'limit have to bigger than 0. Please check again. Current limit: -100',
          );
        }
      });
      it('limit is float', () => {
        try {
          service.is_valid_limit(12.345);
        } catch (e) {
          expect(e).toBeInstanceOf(BadRequestException);
          expect(e.message).toEqual(
            'limit is not integer. Please check again. Current limit: 12.345',
          );
        }
      });
    });
  });
});
