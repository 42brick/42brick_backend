import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('nft/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchNFTs(
    @Param('keyword') keyword: string,
    @Param('symbol') symbol?: string,
    @Param('filter') filter?: string,
  ) {
    // return this.searchService.searchNFTs(keyword, symbol, filter);
    return `/nft/search ${keyword} ${symbol} ${filter}`;
  }
}
