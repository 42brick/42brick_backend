import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    cursor?: string,
    limit?: number,
  ) {
    let _result: unknown;

    try {
      if (filter) {
        _result = await Moralis.EvmApi.token.searchNFTs({
          chain: nftUtils.symbol_to_symbol(symbol),
          q: keyword,
          filter: filter,
          cursor: cursor,
          limit: limit,
        });
      } else {
        _result = await Moralis.EvmApi.token.searchNFTs({
          chain: nftUtils.symbol_to_symbol(symbol),
          q: keyword,
          filter: 'global',
          cursor: cursor,
          limit: limit,
        });
      }

      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: _result['_data'],
      };
    } catch (e) {
      if (e['details']) {
        const _status = e['details']['response']['status'];
        const _statusText = e['details']['response']['statusText'];
        throw new HttpException(_statusText, _status);
      } else if (e['code'] && e['code'] === 'C0005') {
        throw new BadRequestException('Invalid address provided');
      }
      throw new InternalServerErrorException();
    }
  }

  async searchAllNFTs(
    keyword: string,
    filter?: nftUtils.filterType,
    cursor?: string,
    limit?: number,
  ) {
    try {
      if (filter) {
        const ethNFTs = await Moralis.EvmApi.token.searchNFTs({
          chain: EvmChain.ETHEREUM,
          q: keyword,
          filter: filter,
          cursor: cursor,
          limit: limit,
        });
        const bscNFTs = await Moralis.EvmApi.token.searchNFTs({
          chain: EvmChain.BSC,
          q: keyword,
          filter: filter,
          cursor: cursor,
          limit: limit,
        });
        const polygonNFTs = await Moralis.EvmApi.token.searchNFTs({
          chain: EvmChain.POLYGON,
          q: keyword,
          filter: filter,
          cursor: cursor,
          limit: limit,
        });
        const fantomNFTs = await Moralis.EvmApi.token.searchNFTs({
          chain: EvmChain.FANTOM,
          q: keyword,
          filter: filter,
          cursor: cursor,
          limit: limit,
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
        cursor: cursor,
        limit: limit,
      });
      const bscNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.BSC,
        q: keyword,
        filter: 'global',
        cursor: cursor,
        limit: limit,
      });
      const polygonNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.POLYGON,
        q: keyword,
        filter: 'global',
        cursor: cursor,
        limit: limit,
      });
      const fantomNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.FANTOM,
        q: keyword,
        filter: 'global',
        cursor: cursor,
        limit: limit,
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
        const _status = e['details']['response']['status'];
        const _statusText = e['details']['response']['statusText'];
        throw new HttpException(_statusText, _status);
      } else if (e['code'] && e['code'] === 'C0005') {
        throw new BadRequestException('Invalid address provided');
      }
      throw new InternalServerErrorException();
    }
  }
}
