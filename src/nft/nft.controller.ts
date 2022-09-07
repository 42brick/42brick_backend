import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';
import { MintService } from './mint/mint.service';
import * as nftUtils from './utils/nft.utils';
import { MintNftDto } from './mint/dto/mint-nft.dto';

@Controller('nft')
export class NftController {
  constructor(
    private readonly _nftService: NftService,
    private readonly _searchService: SearchService,
    private readonly _dataService: DataService,
    private readonly _validService: ValidService,
    private readonly _mintService: MintService,
  ) {}

  @Get()
  async getNFTs(
    @Query('addr') addr: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_symbol(symbol);
    this._validService.is_valid_limit(limit);
    return this._nftService.getNFTs(addr, symbol, cursor, limit);
  }

  @Get('data')
  async getBscNFTs(
    @Query('token-addr') tokenAddr: string,
    @Query('token-id') tokenId: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
  ) {
    this._validService.is_valid_symbol(symbol);
    return this._dataService.nftData(tokenAddr, tokenId, symbol);
  }

  @Get('search')
  async searchNFTs(
    @Query('keyword') keyword: string,
    @Query('symbol') symbol: nftUtils.allowedSymbol,
    @Query('filter') filter?: nftUtils.filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_keyword(keyword);
    this._validService.is_valid_symbol(symbol);
    this._validService.is_valid_filter(filter);
    this._validService.is_valid_limit(limit);
    return this._searchService.searchNFTs(
      keyword,
      symbol,
      filter,
      cursor,
      limit,
    );
  }

  @Get('search/all')
  async searchAllNFTs(
    @Query('keyword') keyword: string,
    @Query('filter') filter?: nftUtils.filterType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    this._validService.is_valid_keyword(keyword);
    this._validService.is_valid_filter(filter);
    this._validService.is_valid_limit(limit);
    return this._searchService.searchAllNFTs(keyword, filter, cursor, limit);
  }

  @Post('mint')
  @UseInterceptors(FileInterceptor('file'))
  MintNFTs(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // 파일 확장자 제한
        .addFileTypeValidator({ fileType: 'jpg' })
        // 파일 크기 10 MB 제한
        .addMaxSizeValidator({ maxSize: 10485760 }) 
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
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
    @Body() mintNft: MintNftDto
  ) {
    this._mintService.TestFunc(file, mintNft);
    // this._mintService.MinERC721Nft(file, mintNft);
    return 'object about created NFT';
  }
}
