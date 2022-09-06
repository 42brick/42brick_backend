import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';
import { MintService } from './mint/mint.service';

@Module({
  controllers: [NftController],
  providers: [NftService, SearchService, DataService, ValidService, MintService],
  imports: [],
})
export class NftModule {}
