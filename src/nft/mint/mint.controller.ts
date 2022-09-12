import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MintService } from './mint.service';
import { MintNftDto } from './dto/mint-nft.dto';
import { CustomParseFileValidationPipe } from '../pipes/custom-parse-file-validation.pipe';

@Controller('nft/mint')
export class MintController {
  constructor(private readonly _mintService: MintService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  MintNFTs(
    @UploadedFile(ParseFilePipe, CustomParseFileValidationPipe)
    file: Express.Multer.File,
    @Body() mintNft: MintNftDto,
  ) {
    this._mintService.TestFunc(file, mintNft);
    // this._mintService.MinERC721Nft(file, mintNft);
    return 'object about created NFT';
  }
}
