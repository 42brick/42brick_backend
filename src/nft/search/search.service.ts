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
  private createResult(array: any[]) {
    const _newResult = [];
    array.forEach((element) => {
      _newResult.push({
        token_id: element.token_id,
        token_address: element.token_address,
        token_uri: element.token_uri,
        name: element.metadata ? JSON.parse(element.metadata).name : null,
        image: element.metadata ? JSON.parse(element.metadata).image : null,
        metadata: element.metadata,
        contract_type: element.contract_type,
        token_hash: element.token_hash,
        minter_address: element.minter_address,
        block_number_minted: element.block_number_minted,
        transaction_minted: element.transaction_minted,
        last_token_uri_sync: element.last_token_uri_sync,
        last_metadata_sync: element.last_metadata_sync,
        created_at: element.created_at,
      });
    });
    return _newResult;
  }

  async searchNFTs(
    keyword: string,
    symbol: nftUtils.allowedSymbol,
    filter?: nftUtils.filterType,
    cursor?: string,
    limit?: number,
  ) {
    try {
      const _result = await Moralis.EvmApi.token.searchNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        q: keyword,
        filter: filter ? filter : 'global',
        cursor: cursor,
        limit: limit,
      });

      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: {
          total: _result['_data'].total,
          page: _result['_data'].page,
          page_size: _result['_data'].page_size,
          cursor: _result['_data'].cursor,
          result: this.createResult(_result['_data'].result),
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

  async searchAllNFTs(
    keyword: string,
    filter?: nftUtils.filterType,
    cursor?: string,
    limit?: number,
  ) {
    try {
      const _ethNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.ETHEREUM,
        q: keyword,
        filter: filter ? filter : 'global',
        cursor: cursor,
        limit: limit,
      });
      const _bscNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.BSC,
        q: keyword,
        filter: filter ? filter : 'global',
        cursor: cursor,
        limit: limit,
      });
      const _polygonNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.POLYGON,
        q: keyword,
        filter: filter ? filter : 'global',
        cursor: cursor,
        limit: limit,
      });
      const _fantomNFTs = await Moralis.EvmApi.token.searchNFTs({
        chain: EvmChain.FANTOM,
        q: keyword,
        filter: filter ? filter : 'global',
        cursor: cursor,
        limit: limit,
      });

      return {
        Ethereum: {
          chain: 'Ethereum',
          symbol: 'eth',
          result: {
            total: _ethNFTs['_data'].total,
            page: _ethNFTs['_data'].page,
            page_size: _ethNFTs['_data'].page_size,
            cursor: _ethNFTs['_data'].cursor,
            result: this.createResult(_ethNFTs['_data'].result),
          },
        },
        BSC: {
          chain: 'Binance Smart Chain',
          symbol: 'bsc',

          result: {
            total: _bscNFTs['_data'].total,
            page: _bscNFTs['_data'].page,
            page_size: _bscNFTs['_data'].page_size,
            cursor: _bscNFTs['_data'].cursor,
            result: this.createResult(_bscNFTs['_data'].result),
          },
        },
        Polygon: {
          chain: 'Polygon',
          symbol: 'matic',
          result: {
            total: _polygonNFTs['_data'].total,
            page: _polygonNFTs['_data'].page,
            page_size: _polygonNFTs['_data'].page_size,
            cursor: _polygonNFTs['_data'].cursor,
            result: this.createResult(_polygonNFTs['_data'].result),
          },
        },
        Fantom: {
          chain: 'Fantom',
          symbol: 'ftm',
          result: {
            total: _fantomNFTs['_data'].total,
            page: _fantomNFTs['_data'].page,
            page_size: _fantomNFTs['_data'].page_size,
            cursor: _fantomNFTs['_data'].cursor,
            result: this.createResult(_fantomNFTs['_data'].result),
          },
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
