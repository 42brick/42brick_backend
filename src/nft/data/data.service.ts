import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';
import * as nftUtils from '../utils/nft.utils';

dotenv.config();
Moralis.start({
  apiKey: process.env.API_KEY,
  formatEvmChainId: 'decimal',
});

@Injectable()
export class DataService {
  async nftData(
    tokenAddr: string,
    tokenId: string,
    symbol: nftUtils.allowedSymbol,
  ) {
    const result = await Moralis.EvmApi.token.getTokenIdMetadata({
      address: tokenAddr,
      tokenId: tokenId,
      chain: nftUtils.symbol_to_symbol(symbol),
    });

    return {
      chain: nftUtils.symbol_to_chain(symbol),
      symbol: symbol,
      result: result['_data'],
    };
  }
}
