import {
  InternalServerErrorException,
  BadRequestException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';
import * as nftUtils from './utils/nft.utils';

dotenv.config();
Moralis.start({
  apiKey: process.env.API_KEY,
  formatEvmChainId: 'decimal',
});

@Injectable()
export class NftService {
  async getNFTs(
    addr: string,
    symbol: nftUtils.allowedSymbol,
    cursor?: string,
    limit?: number,
  ) {
    try {
      const _result = await Moralis.EvmApi.account.getNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        address: addr,
        cursor: cursor,
        limit: limit,
      });

      const _newResult = [];
      _result['_data'].result.forEach((element) => {
        _newResult.push({
          token_address: element.token_address,
          token_id: element.token_id,
          amount: element.amount,
          owner_of: element.owner_of,
          token_hash: element.token_hash,
          block_number_minted: element.block_number_minted,
          block_number: element.block_number,
          contract_type: element.contract_type,
          name: element.name,
          symbol: element.symbol,
          token_uri: element.token_uri,
          image: element.metadata ? JSON.parse(element.metadata).image : null,
          metadata: element.metadata,
          last_token_uri_sync: element.last_token_uri_sync,
          last_metadata_sync: element.last_token_uri_sync,
        });
      });

      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: {
          total: _result['_data'].total,
          page: _result['_data'].page,
          page_size: _result['_data'].page_size,
          cursor: _result['_data'].cursor,
          result: _newResult,
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
