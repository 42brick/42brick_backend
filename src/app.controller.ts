import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('nft-data')
  nftData(
    @Param('addr') addr: string,
    @Param('token-id') tokenId: string,
    @Param('symbol') symbol: string,
  ) {
    return this.appService.nftData({ addr, tokenId, symbol });
  }

  @Get('get-nfts')
  getNFTs(@Param('addr') addr: string, @Param('symbol') symbol?: string) {
    return this.appService.getNFTs(addr, symbol);
  }

  @Get('search-nfts')
  searchNFTs(
    @Param('keyword') keyword: string,
    @Param('symbol') symbol?: string,
    @Param('filter') filter?: string,
  ) {
    return this.appService.searchNFTs(keyword, symbol, filter);
  }
}
