import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class KeywordValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined)
      throw new BadRequestException(
        'Any keyword is not inputed. Please input the keyword that its minimum length is 3 and maximum length is 256',
      );
    if (value.length < 3)
      throw new BadRequestException(
        'keyword length is lower than 3. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
      );
    if (value.length > 256)
      throw new BadRequestException(
        'keyword length is bigger than 256. Please try again to input the keyword that its minimum length is 3 and maximum length is 256',
      );
    return value;
  }
}
