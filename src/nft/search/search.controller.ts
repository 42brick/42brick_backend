import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { allowedSymbol, filterType } from '../utils/nft.utils';
import { SymbolValidationPipe } from '../pipes/symbol-validation.pipe';
import { FilterValidationPipe } from '../pipes/filter-validation.pipe';
import { KeywordValidationPipe } from '../pipes/keyword-validation.pipe';

@Controller('nft/search')
export class SearchController {
  constructor(private readonly _searchService: SearchService) {}

  @Get()
  async searchNFTs(
    @Query('keyword', KeywordValidationPipe) keyword: string,
    @Query('symbol', SymbolValidationPipe) symbol: allowedSymbol,
    @Query('filter', FilterValidationPipe) filter?: filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
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
    @Query('keyword', KeywordValidationPipe) keyword: string,
    @Query('filter', FilterValidationPipe) filter?: filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this._searchService.searchAllNFTs(keyword, filter, cursor, limit);
  }
}
