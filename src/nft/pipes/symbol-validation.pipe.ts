import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class SymbolValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    this.isValidSymbol(value);
    return value;
  }

  private isValidSymbol(symbol: any) {
    if (symbol === undefined)
      throw new BadRequestException(
        'Any symbol is not inputed. Please input the symbol. Allowed symbols: eth, bsc, matic, ftm',
      );
    if (
      symbol !== 'eth' &&
      symbol !== 'bsc' &&
      symbol !== 'matic' &&
      symbol !== 'ftm'
    )
      throw new BadRequestException(
        `It is not allowed symbol. Please check again. Allowed symbols: eth, bsc, matic, ftm`,
      );
  }
}
