import { BadRequestException, Injectable } from '@nestjs/common';
import * as type from '../utils/nft.utils';

@Injectable()
export class ValidService {
  is_valid_filter(filter: type.filterType) {
    if (
      filter !== 'name' &&
      filter !== 'description' &&
      filter !== 'attributes' &&
      filter !== 'global' &&
      filter !== 'name,description' &&
      filter !== 'name,attributes' &&
      filter !== 'description,attributes' &&
      filter !== 'name,description,attributes'
    )
      throw new BadRequestException(
        `You cannot use this filter. Please check again. Current filter: ${filter}`,
      );
  }

  is_valid_symbol(symbol: type.allowedSymbol) {
    if (
      symbol !== 'eth' &&
      symbol !== 'bsc' &&
      symbol !== 'matic' &&
      symbol !== 'ftm'
    )
      throw new BadRequestException(
        `It is not allowed symbol. Please check again. Current filter: ${symbol}`,
      );
  }

  is_valid_keyword(keyword: string) {
    if (keyword == undefined)
      throw new BadRequestException(
        'Any keyword is not inputed. Please input the keyword that its minimum length is 3 and maximum length is 256',
      );
    if (keyword.length < 3)
      throw new BadRequestException(
        'keyword length is lower than 3. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
      );
    if (keyword.length > 256)
      throw new BadRequestException(
        'keyword length is bigger than 256. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
      );
  }
}
