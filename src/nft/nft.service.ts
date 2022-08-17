import { Injectable, BadRequestException } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import * as dotenv from 'dotenv';
import {
  is_valid_symbol,
  symbol_to_symbol,
  symbol_to_chain,
} from './utils/nft.utils';

dotenv.config();
Moralis.start({
  apiKey: process.env.API_KEY,
  formatEvmChainId: 'decimal',
});

@Injectable()
export class NftService {
  getNFTs(addr: string, symbol?: string) {
    if (symbol) {
      if (!is_valid_symbol(symbol))
        throw new BadRequestException(
          `A symbol that cannot be processed. Please check again. Vegetable symbol: ${symbol}`,
        );

      const result = Moralis.EvmApi.account.getNFTs({
        chain: symbol_to_symbol(symbol),
        address: addr,
      });
      return {
        chain: symbol_to_chain(symbol),
        symbol: symbol,
        result: result,
      };
    }

    const ethNFTs = Moralis.EvmApi.account.getNFTs({
      chain: EvmChain.ETHEREUM,
      address: addr,
    });
    const bscNFTs = Moralis.EvmApi.account.getNFTs({
      chain: EvmChain.BSC,
      address: addr,
    });
    const polygonNFTs = Moralis.EvmApi.account.getNFTs({
      chain: EvmChain.POLYGON,
      address: addr,
    });
    const fantomNFTs = Moralis.EvmApi.account.getNFTs({
      chain: EvmChain.FANTOM,
      address: addr,
    });

    return {
      Ethereum: {
        chain: 'Ethereum',
        symbol: 'eth',
        result: ethNFTs,
      },
      BSC: {
        chain: 'Binance Smart Chain',
        symbol: 'bsc',
        result: bscNFTs,
      },
      Polygon: {
        chain: 'Polygon',
        symbol: 'matic',
        result: polygonNFTs,
      },
      Fantom: {
        chain: 'Fantom',
        symbol: 'ftm',
        result: fantomNFTs,
      },
    };
  }
}
