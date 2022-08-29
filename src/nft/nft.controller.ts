import { Controller, Get, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';
import * as nftUtils from './utils/nft.utils';

@Controller('nft')
export class NftController {
  constructor(
    private readonly _nftService: NftService,
    private readonly _searchService: SearchService,
    private readonly _dataService: DataService,
    private readonly _validService: ValidService,
  ) {}

  @Get()
  async getNFTs(
    @Query('addr') addr: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_symbol(symbol);
    this._validService.is_valid_limit(limit);
    return this._nftService.getNFTs(addr, symbol, cursor, limit);
  }

  @Get('data')
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    this._validService.is_valid_symbol(symbol);
    return this._dataService.nftData(tokenAddr, tokenId, symbol);
  }

  @Get('search')
  async searchNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('filter') filter?: nftUtils.filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
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

  @Get('search/all')
  async searchAllNFTs(
    @Query('keyword') keyword: string,
    @Query('filter') filter?: nftUtils.filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_filter(filter);
    this._validService.is_valid_limit(limit);
    return this._searchService.searchAllNFTs(keyword, filter, cursor, limit);
  }
}
