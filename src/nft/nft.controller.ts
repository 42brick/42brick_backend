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
  getNFTs(@Query('addr') addr: string, @Query('symbol') symbol?: string) {
    return this.nftService.getNFTs(addr, symbol);
  }

  @Get('search')
  getEthNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol?: string,
    @Query('filter') filter?: nftUtils.filterType,
  ) {
    return this.searchService.searchNFTs(keyword, symbol, filter);
  }

  @Get('data')
  getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-Id') tokenId: string,
    @Query('symbol') symbol: string,
  ) {
    return this.dataService.nftData(tokenAddr, tokenId, symbol);
  }
}
