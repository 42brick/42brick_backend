import { Controller, Get, Query } from '@nestjs/common';
import { EmptyStringPipe } from '../pipes/empty-string.pipe';
import { SymbolValidationPipe } from '../pipes/symbol-validation.pipe';
import { allowedSymbol } from '../utils/nft.utils';
import { DataService } from './data.service';

@Controller('nft/data')
export class DataController {
  constructor(private readonly _dataService: DataService) {}

  @Get()
  async getBscNFTs(
    @Query('token-addr', EmptyStringPipe) tokenAddr: string,
    @Query('token-id', EmptyStringPipe) tokenId: string,
    @Query('symbol', SymbolValidationPipe) symbol: allowedSymbol,
  ) {
    return this._dataService.nftData(tokenAddr, tokenId, symbol);
  }
}
