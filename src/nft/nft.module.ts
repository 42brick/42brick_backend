import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { SearchController } from './search/search.controller';
import { NftService } from './nft.service';
import { DataController } from './data/data.controller';
import { SearchService } from './search/search.service';
import { DataService } from './data/data.service';

@Module({
  controllers: [SearchController, NftController, DataController],
  providers: [NftService, SearchService, DataService],
  imports: [],
})
export class NftModule {}
