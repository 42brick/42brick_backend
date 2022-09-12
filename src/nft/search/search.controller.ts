import { Controller, Get, Query } from '@nestjs/common';
import { ValidService } from '../valid/valid.service';
import { SearchService } from './search.service';
import { allowedSymbol, filterType } from '../utils/nft.utils';

@Controller('search')
export class SearchController {
  constructor(
    private readonly _searchService: SearchService,
    private readonly _validService: ValidService,
  ) {}

  @Get()
  async searchNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol: allowedSymbol,
    @Query('filter') filter?: filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_keyword(keyword);
    this._validService.is_valid_symbol(symbol);
    this._validService.is_valid_filter(filter);
    this._validService.is_valid_limit(limit);
    return this._searchService.searchNFTs(
      keyword,
      symbol,
      filter,
      cursor,
      limit,
    );
  }

  @Get('all')
  async searchAllNFTs(
    @Query('keyword') keyword: string,
    @Query('filter') filter?: filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_keyword(keyword);
    this._validService.is_valid_filter(filter);
    this._validService.is_valid_limit(limit);
    return this._searchService.searchAllNFTs(keyword, filter, cursor, limit);
  }
}
