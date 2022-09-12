import { Controller, Get, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import * as nftUtils from './utils/nft.utils';
import { SymbolValidationPipe } from './pipes/symbol-validation.pipe';

@Controller('nft')
export class NftController {
  constructor(private readonly _nftService: NftService) {}

  @Get()
  async getNFTs(
    @Query('addr') addr: string,
    @Query('symbol', SymbolValidationPipe) symbol: nftUtils.allowedSymbol,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this._nftService.getNFTs(addr, symbol, cursor, limit);
  }
}
