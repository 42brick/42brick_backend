import {
  Injectable,
  HttpException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';
import * as nftUtils from '../utils/nft.utils';

dotenv.config();
Moralis.start({
  apiKey: process.env.API_KEY,
  formatEvmChainId: 'decimal',
});

@Injectable()
export class DataService {
  async nftData(
    tokenAddr: string,
    tokenId: string,
    symbol: nftUtils.allowedSymbol,
  ) {
    try {
      const _result = await Moralis.EvmApi.token.getTokenIdMetadata({
        address: tokenAddr,
        chain: nftUtils.symbol_to_symbol(symbol),
        tokenId: tokenId,
      });

      return {
        chain: nftUtils.symbol_to_chain(symbol),
        symbol: symbol,
        result: {
          token_address: _result['_data'].token_address,
          token_id: _result['_data'].token_id,
          owner_of: _result['_data'].owner_of,
          block_number: _result['_data'].block_number,
          block_number_minted: _result['_data'].block_number_minted,
          token_hash: _result['_data'].token_hash,
          amount: _result['_data'].amount,
          contract_type: _result['_data'].contract_type,
          name: _result['_data'].name,
          symbol: _result['_data'].symbol,
          token_uri: _result['_data'].token_uri,
          // eslint-disable-next-line prettier/prettier
          image: _result['_data'] ? JSON.parse(_result['_data'].metadata).image : null,
          metadata: _result['_data'].metadata,
          last_token_uri_sync: _result['_data'].last_token_uri_sync,
          last_metadata_sync: _result['_data'].last_metadata_sync,
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
