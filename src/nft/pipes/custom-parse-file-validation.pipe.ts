import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseFileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (!this.isValidFileSize(value.size))
      throw new BadRequestException(
        'The file is too big! File size is below than 10 MB.',
      );
    if (!this.isValidMimetype(value.mimetype))
      throw new BadRequestException('The file type is not allowed.');
    return value;
  }

  // 파일 크기 확인(10MB 이하만 허용)
  private isValidFileSize(size: any) {
    const _limitedSize = 10485760;
    return size < _limitedSize;
  }

  // 허용되는 확장자인지 확인: jpg, jpeg, png, gif, svg, mp4, webm, mp3, wav, ogg, glb, gltf
  private isValidMimetype(type: any) {
    return (
      type === 'image/jpeg' || // jpg, jpeg
      type === 'image/png' || // png
      type === 'image/gif' || // gif
      type === 'image/svg+xml' || // svg
      type === 'video/mp4' || // mp4
      type === 'video/webm' || // webm
      type === 'audio/mp3' || // mp3
      type === 'audio/x-wav' || // wav
      type === 'audio/ogg' || // ogg
      type === 'model/gltf-binary' // glb, gltf
    );
  }
}
