import { Controller, Get, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import * as nftUtils from './utils/nft.utils';

@Controller('nft')
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly searchService: SearchService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  async getNFTs(
    @Query('addr') addr: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    return this.nftService.getNFTs(addr, symbol);
  }

  @Get('data')
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    return this.dataService.nftData(tokenAddr, tokenId, symbol);
  }

  @Get('search')
  async searchNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('filter') filter?: nftUtils.filterType,
  ) {
    return this.searchService.searchNFTs(keyword, symbol, filter);
  }

  @Get('search/all')
  async searchAllNFTs(
    @Query('keyword') keyword: string,
    @Query('filter') filter?: nftUtils.filterType,
  ) {
    return this.searchService.searchAllNFTs(keyword, filter);
  }
}
