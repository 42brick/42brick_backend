/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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
    symbol: nftUtils.allowedSymbol,
    filter?: nftUtils.filterType,
  ) {
    let result: unknown;
    let flag = false;

    nftUtils.is_valid_symbol(symbol);
    nftUtils.is_valid_keyword(keyword);
    if (filter)
      flag = nftUtils.is_valid_filter(filter);

    try {
      if (flag) {
        result = await Moralis.EvmApi.token.searchNFTs({
          chain: nftUtils.symbol_to_symbol(symbol),
          q: keyword,
          filter: filter,
        });
      } else {
        result = await Moralis.EvmApi.token.searchNFTs({
          chain: nftUtils.symbol_to_symbol(symbol),
          q: keyword,
          filter: 'global',
        });
      }

      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: result['_data'],
      };
    } catch (e) {
      if (e['details']) {
        const status = e['details']['response']['status'];
        const statusText = e['details']['response']['statusText'];
        throw new HttpException(statusText, status);
      } else if (e['code'] && e['code'] === 'C0005') {
        throw new BadRequestException('Invalid address provided');
      }
      throw new BadRequestException();
    }
  }

  async searchAllNFTs(keyword: string, filter?: nftUtils.filterType) {
    let flag = false;

    nftUtils.is_valid_keyword(keyword);
    if (filter)
      flag = nftUtils.is_valid_filter(filter);

    try {
      if (flag) {
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
    } catch (e) {
      if (e['details']) {
        const status = e['details']['response']['status'];
        const statusText = e['details']['response']['statusText'];
        throw new HttpException(statusText, status);
      } else if (e['code'] && e['code'] === 'C0005') {
        throw new BadRequestException('Invalid address provided');
      }
      throw new BadRequestException();
    }
  }
}
