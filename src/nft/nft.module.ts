import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';
import { ValidService } from './valid/valid.service';

@Module({
  controllers: [NftController],
  providers: [NftService, SearchService, DataService, ValidService],
  imports: [],
})
export class NftModule {}
