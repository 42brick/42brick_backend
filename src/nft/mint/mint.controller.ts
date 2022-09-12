import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MintService } from './mint.service';
import { MintNftDto } from './dto/mint-nft.dto';

@Controller('mint')
export class MintController {
  constructor(private readonly _mintService: MintService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  MintNFTs(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // 파일 확장자 제한
        .addFileTypeValidator({ fileType: 'jpg' })
        // 파일 크기 10 MB 제한
        .addMaxSizeValidator({ maxSize: 10485760 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
      // new ParseFilePipeBuilder()
      //   // 파일 확장자 제한
      //   .addFileTypeValidator({ fileType: 'jpg' })
      //   .addFileTypeValidator({ fileType: 'jpeg' })
      //   .addFileTypeValidator({ fileType: 'png' })
      //   .addFileTypeValidator({ fileType: 'gif' })
      //   .addFileTypeValidator({ fileType: 'svg' })
      //   .addFileTypeValidator({ fileType: 'mp4' })
      //   .addFileTypeValidator({ fileType: 'webm' })
      //   .addFileTypeValidator({ fileType: 'mp3' })
      //   .addFileTypeValidator({ fileType: 'wav' })
      //   .addFileTypeValidator({ fileType: 'ogg' })
      //   .addFileTypeValidator({ fileType: 'glb' })
      //   .addFileTypeValidator({ fileType: 'gltf' })
      //   // 파일 크리 10 MB 제한
      //   .addMaxSizeValidator({ maxSize: 10485760 })
      //   .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() mintNft: MintNftDto,
  ) {
    this._mintService.TestFunc(file, mintNft);
    // this._mintService.MinERC721Nft(file, mintNft);
    return 'object about created NFT';
  }
}
