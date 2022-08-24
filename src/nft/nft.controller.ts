import { Controller, Get, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';
import * as nftUtils from './utils/nft.utils';

@Controller('nft')
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly searchService: SearchService,
    private readonly dataService: DataService,
    private readonly validService: ValidService,
  ) {}

  @Get()
  async getNFTs(
    @Query('addr') addr: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    this.validService.is_valid_symbol(symbol);
    return this.nftService.getNFTs(addr, symbol);
  }

  @Get('data')
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    this.validService.is_valid_symbol(symbol);
    return this.dataService.nftData(tokenAddr, tokenId, symbol);
  }

  @Get('search')
  async searchNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('filter') filter?: nftUtils.filterType,
  ) {
    this.validService.is_valid_symbol(symbol);
    if (filter) this.validService.is_valid_filter(filter);
    return this.searchService.searchNFTs(keyword, symbol, filter);
  }

  @Get('search/all')
  async searchAllNFTs(
    @Query('keyword') keyword: string,
    @Query('filter') filter?: nftUtils.filterType,
  ) {
    if (filter) this.validService.is_valid_filter(filter);
    return this.searchService.searchAllNFTs(keyword, filter);
  }
}
