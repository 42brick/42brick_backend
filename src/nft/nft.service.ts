import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';

dotenv.config();
Moralis.start({ apiKey: process.env.API_KEY });

@Injectable()
export class NftService {
  getNFTs(addr: string, symbol?: string) {
    if (typeof symbol === 'undefined') {
      const ethNFTs = Moralis.EvmApi.account.getNFTs({
        chain: 'eth',
        address: addr,
      });
      const bscNFTs = Moralis.EvmApi.account.getNFTs({
        chain: 'bsc',
        address: addr,
      });
      const polygonNFTs = Moralis.EvmApi.account.getNFTs({
        chain: 'polygon',
        address: addr,
      });
      const fantomNFTs = Moralis.EvmApi.account.getNFTs({
        chain: 'fantom',
        address: addr,
      });

      return {
        Ethereum: {
          chain: 'Ethereum',
          symbol: 'eth',
          ...ethNFTs,
        },
        BSC: {
          chain: 'Binance Smart Chain',
          symbol: 'bsc',
          ...bscNFTs,
        },
        Polygon: {
          chain: 'Polygon',
          symbol: 'polygon',
          ...polygonNFTs,
        },
        Fantom: {
          chain: 'Fantom',
          symbol: 'fantom',
          ...fantomNFTs,
        },
      };
    }
    return Moralis.EvmApi.account.getNFTs({ symbol: symbol, address: addr });
  }
}
