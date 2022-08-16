import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('nft/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  nftData(
    @Param('token-addr') tokenAddr: string,
    @Param('token-id') tokenId: string,
    @Param('symbol') symbol: string,
  ) {
    return this.dataService.nftData(tokenAddr, tokenId, symbol);
  }
}
