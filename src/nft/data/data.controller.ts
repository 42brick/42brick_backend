import { Controller, Get, Query } from '@nestjs/common';
import { SymbolValidationPipe } from '../pipes/symbol-validation.pipe';
import { allowedSymbol } from '../utils/nft.utils';
import { DataService } from './data.service';

@Controller('nft/data')
export class DataController {
  constructor(private readonly _dataService: DataService) {}

  @Get()
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol', SymbolValidationPipe) symbol: allowedSymbol,
  ) {
    return this._dataService.nftData(tokenAddr, tokenId, symbol);
  }
}
