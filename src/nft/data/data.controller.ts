import { Controller, Get, Query } from '@nestjs/common';
import { allowedSymbol } from '../utils/nft.utils';
import { ValidService } from '../valid/valid.service';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(
    private readonly _dataService: DataService,
    private readonly _validService: ValidService,
  ) {}

  @Get()
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol') symbol: allowedSymbol,
  ) {
    this._validService.is_valid_symbol(symbol);
    return this._dataService.nftData(tokenAddr, tokenId, symbol);
  }
}
