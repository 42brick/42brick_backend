import { Injectable, BadRequestException } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import * as dotenv from 'dotenv';
import * as nftUtils from '../utils/nft.utils';

dotenv.config();
Moralis.start({
  apiKey: process.env.API_KEY,
  formatEvmChainId: 'decimal',
});

@Injectable()
export class SearchService {
  searchNFTs(keyword: string, symbol?: string, filter?: nftUtils.filterType) {
    if (!nftUtils.is_valid_symbol(symbol))
      throw new BadRequestException(
        `A symbol that cannot be processed. Please check again. Vegetable symbol: ${symbol}`,
      );
    if (symbol && filter) {
      const result = Moralis.EvmApi.token.searchNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        q: keyword,
        filter: filter,
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result,
      };
    } else if (symbol) {
      const result = Moralis.EvmApi.token.searchNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        q: keyword,
        filter: 'global',
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result,
      };
    } else if (filter) {
      const result = Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.ETHEREUM,
        q: keyword,
        filter: filter,
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result,
      };
    }

    const ethNFTs = Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.ETHEREUM,
      q: keyword,
      filter: 'global',
    });
    const bscNFTs = Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.BSC,
      q: keyword,
      filter: 'global',
    });
    const polygonNFTs = Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.POLYGON,
      q: keyword,
      filter: 'global',
    });
    const fantomNFTs = Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.FANTOM,
      q: keyword,
      filter: 'global',
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
        symbol: 'polygon',
        result: polygonNFTs,
      },
      Fantom: {
        chain: 'Fantom',
        symbol: 'fantom',
        result: fantomNFTs,
      },
    };
  }
}
