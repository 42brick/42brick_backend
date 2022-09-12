import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class SymbolValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined)
      throw new BadRequestException(
        'Any symbol is not inputed. Please input the symbol. Allowed symbols: eth, bsc, matic, ftm',
      );
    if (!this.isValidSymbol(value))
      throw new BadRequestException(
        `It is not allowed symbol. Please check again. Allowed symbols: eth, bsc, matic, ftm`,
      );
    return value;
  }

  private isValidSymbol(symbol: any) {
    return (
      symbol === 'eth' ||
      symbol === 'bsc' ||
      symbol === 'matic' ||
      symbol === 'ftm'
    );
  }
}
