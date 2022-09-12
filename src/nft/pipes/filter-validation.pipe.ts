import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FilterValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !this.isValidFilter(value)) {
      throw new BadRequestException(
        `You cannot use this filter. Please check again. Current filter: ${value}`,
      );
    }
    return value;
  }

  private isValidFilter(filter: any) {
    return (
      filter === 'name' ||
      filter === 'description' ||
      filter === 'attributes' ||
      filter === 'global' ||
      filter === 'name,description' ||
      filter === 'name,attributes' ||
      filter === 'description,attributes' ||
      filter === 'name,description,attributes'
    );
  }
}
