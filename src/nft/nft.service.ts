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
  async getNFTs(addr: string, symbol: nftUtils.allowedSymbol) {
    try {
      const result = await Moralis.EvmApi.account.getNFTs({
        chain: nftUtils.symbol_to_symbol(symbol),
        address: addr,
      });

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
      throw new InternalServerErrorException();
    }
  }
}
