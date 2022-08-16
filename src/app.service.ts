import { Injectable, NotFoundException } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';

dotenv.config();
Moralis.start({ apiKey: process.env.API_KEY });

@Injectable()
export class AppService {
  private is_valid_symbol = (symbol: string): boolean => {
    if (
      symbol !== 'eth' &&
      symbol !== 'bsc' &&
      symbol !== 'matic' &&
      symbol !== 'ftm'
    )
      return false;
    return true;
  };
  private is_valid_filter = (_filter: string): boolean => {
    if (
      _filter !== 'name' &&
      _filter !== 'description' &&
      _filter !== 'attributes' &&
      _filter !== 'global' &&
      _filter !== 'name,description' &&
      _filter !== 'name,attributes' &&
      _filter !== 'description,attributes' &&
      _filter !== 'name,description,attributes'
    )
      return false;
    return true;
  };

  nftData({
    addr,
    tokenId,
    symbol,
  }: {
    addr: string;
    tokenId: string;
    symbol: string;
  }): unknown {
    if (!this.is_valid_symbol(symbol)) {
      throw new NotFoundException(`${symbol} is not valid`);
    }
    return Moralis.EvmApi.token.getTokenIdMetadata({
      address: addr,
      tokenId: tokenId,
      chain: symbol,
    });
  }

  getNFTs(addr: string, symbol?: string): unknown {
    if (typeof symbol === 'undefined') {
      const options = [
        { chain: 'eth', address: addr },
        { chain: 'bsc', address: addr },
        { chain: 'matic', address: addr },
        { chain: 'ftm', address: addr },
      ];

      const ethNFTs = Moralis.EvmApi.account.getNFTs(options[0]);
      const bscNFTs = Moralis.EvmApi.account.getNFTs(options[1]);
      const polygonNFTs = Moralis.EvmApi.account.getNFTs(options[2]);
      const ftmNFTs = Moralis.EvmApi.account.getNFTs(options[3]);

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
          symbol: 'matic',
          ...polygonNFTs,
        },
        Fantom: {
          chain: 'Fantom',
          symbol: 'ftm',
          ...ftmNFTs,
        },
      };
    }
    if (this.is_valid_symbol(symbol)) {
      throw new NotFoundException(`${symbol} cannot be processed.`);
    }
    return Moralis.EvmApi.account.getNFTs({ symbol: symbol, address: addr });
  }

  searchNFTs(keyword: string, symbol?: string, _filter?: string): unknown {
    if (this.is_valid_symbol(symbol))
      throw new NotFoundException(`${symbol} is not valid`);
    if (this.is_valid_filter(_filter))
      throw new NotFoundException(`${_filter} is not valid`);
    if (symbol && _filter)
      return Moralis.EvmApi.token.searchNFTs({
        chain: symbol,
        q: keyword,
        filter: _filter,
      });
    else if (symbol)
      return Moralis.EvmApi.token.searchNFTs({
        chain: symbol,
        q: keyword,
        filter: 'global',
      });
    else if (_filter)
      return Moralis.EvmApi.token.searchNFTs({
        chain: 'eth',
        q: keyword,
        filter: _filter,
      });

    const options = [
      { chain: 'eth', q: keyword, filter: 'global' },
      { chain: 'bsc', q: keyword, filter: 'global' },
      { chain: 'matic', q: keyword, filter: 'global' },
      { chain: 'ftm', q: keyword, filter: 'global' },
    ];

    const ethNFTs = Moralis.EvmApi.token.searchNFTs(options[0]);
    const bscNFTs = Moralis.EvmApi.token.searchNFTs(options[1]);
    const polygonNFTs = Moralis.EvmApi.token.searchNFTs(options[2]);
    const ftmNFTs = Moralis.EvmApi.token.searchNFTs(options[3]);

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
        symbol: 'matic',
        ...polygonNFTs,
      },
      Fantom: {
        chain: 'Fantom',
        symbol: 'ftm',
        ...ftmNFTs,
      },
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
