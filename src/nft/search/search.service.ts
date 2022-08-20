import { Injectable } from '@nestjs/common';
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
  async searchNFTs(
    keyword: string,
    symbol?: nftUtils.allowedSymbol,
    filter?: nftUtils.filterType,
  ) {
    if (symbol && filter) {
      const result = await Moralis.EvmApi.token.searchNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        q: keyword,
        filter: filter,
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result['_data'],
      };
    } else if (symbol) {
      const result = await Moralis.EvmApi.token.searchNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        q: keyword,
        filter: 'global',
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result['_data'],
      };
    } else if (filter) {
      const result = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.ETHEREUM,
        q: keyword,
        filter: filter,
      });
      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result['_data'],
      };
    }

    const result = await Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.ETHEREUM,
      q: keyword,
      filter: 'global',
    });
    return {
      chain: 'Ethereum',
      symbol: 'eth',
      result: result['_data'],
    };
  }

  async searchAllNFTs(keyword: string, filter?: nftUtils.filterType) {
    if (filter) {
      const ethNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.ETHEREUM,
        q: keyword,
        filter: filter,
      });
      const bscNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.BSC,
        q: keyword,
        filter: filter,
      });
      const polygonNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.POLYGON,
        q: keyword,
        filter: filter,
      });
      const fantomNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.FANTOM,
        q: keyword,
        filter: filter,
      });

      return {
        Ethereum: {
          chain: 'Ethereum',
          symbol: 'eth',
          result: ethNFTs['_data'],
        },
        BSC: {
          chain: 'Binance Smart Chain',
          symbol: 'bsc',
          result: bscNFTs['_data'],
        },
        Polygon: {
          chain: 'Polygon',
          symbol: 'matic',
          result: polygonNFTs['_data'],
        },
        Fantom: {
          chain: 'Fantom',
          symbol: 'ftm',
          result: fantomNFTs['_data'],
        },
      };
    }

    const ethNFTs = await Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.ETHEREUM,
      q: keyword,
      filter: 'global',
    });
    const bscNFTs = await Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.BSC,
      q: keyword,
      filter: 'global',
    });
    const polygonNFTs = await Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.POLYGON,
      q: keyword,
      filter: 'global',
    });
    const fantomNFTs = await Moralis.EvmApi.token.searchNFTs({
      chain: EvmChain.FANTOM,
      q: keyword,
      filter: 'global',
    });

    return {
      Ethereum: {
        chain: 'Ethereum',
        symbol: 'eth',
        result: ethNFTs['_data'],
      },
      BSC: {
        chain: 'Binance Smart Chain',
        symbol: 'bsc',
        result: bscNFTs['_data'],
      },
      Polygon: {
        chain: 'Polygon',
        symbol: 'matic',
        result: polygonNFTs['_data'],
      },
      Fantom: {
        chain: 'Fantom',
        symbol: 'ftm',
        result: fantomNFTs['_data'],
      },
    };
  }
}