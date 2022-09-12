import { Controller, Get, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';
import * as nftUtils from './utils/nft.utils';

@Controller('nft')
export class NftController {
  constructor(
    private readonly _nftService: NftService,
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
}
