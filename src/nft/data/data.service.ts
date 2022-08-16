import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';

dotenv.config();
Moralis.start({ apiKey: process.env.API_KEY });

@Injectable()
export class DataService {
  nftData(tokenAddr: string, tokenId: string, symbol: string) {
    return Moralis.EvmApi.token.getTokenIdMetadata({
      address: tokenAddr,
      tokenId: tokenId,
      chain: symbol,
    });
  }
}
